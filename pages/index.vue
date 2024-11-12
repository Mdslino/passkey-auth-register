<script setup lang="ts">
import { z } from "zod";
import { startAuthentication } from "@simplewebauthn/browser";
useHead({
  title: "Passkey Auth",
});

const fidoSign = useFidoSign();
const fidoAuth = useFidoAuth();

const schema = z.object({
  rp: z.string(),
  id: z.string(),
  name: z.string(),
  displayName: z.string(),
  challenge: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  rp: "localhost",
  id: undefined,
  name: undefined,
  displayName: undefined,
  email: undefined,
  challenge: undefined,
});

async function register(state: Schema) {
  const response = await navigator.credentials.create({
    publicKey: {
      rp: {
        id: state.rp,
        name: state.name,
      },

      user: {
        id: Uint8Array.from(state.id, (c) => c.charCodeAt(0)),
        name: state.displayName,
        displayName: state.displayName,
      },

      challenge: Uint8Array.from(state.challenge, (c) => c.charCodeAt(0)),

      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -257,
        },
      ],
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "preferred",
      },
      extensions: {
        // returns back details about the passkey
        credProps: true,
      },
    },
  });
  console.log(state);
  fidoSign.value = response!;
  navigateTo("/code");
}

async function auth(state: Schema) {
  const response = await navigator.credentials.get({
    publicKey: {
      rpId: state.rp,
      challenge: Uint8Array.from(state.challenge, (c) => c.charCodeAt(0)),
      allowCredentials: [
        {
          type: "public-key",
          id: Uint8Array.from(state.id, (c) => c.charCodeAt(0)),
        },
      ],
      userVerification: "preferred",
    },
  });
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormGroup label="RP" name="rp">
        <UInput v-model="state.rp" />
      </UFormGroup>

      <UFormGroup label="ID" name="id">
        <UInput v-model="state.id" />
      </UFormGroup>

      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup label="Display Name" name="displayName">
        <UInput v-model="state.displayName" />
      </UFormGroup>

      <UFormGroup label="Challenge" name="challenge">
        <UInput v-model="state.challenge" />
      </UFormGroup>

      <div class="space-x-4">
        <UButton color="blue" @click="() => register(state)">Registrar</UButton>
        <UButton color="green" @click="() => auth(state)">Autenticar</UButton>
      </div>
    </UForm>
  </div>
</template>
