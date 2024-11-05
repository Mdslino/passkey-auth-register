<script setup lang="ts">
import { z } from "zod";
import { client } from "@passwordless-id/webauthn";
import {startRegistration, startAuthentication} from "@simplewebauthn/browser"
useHead({
  title: "Passkey Auth",
});

const fidoSign = useFidoSign();
const fidoAuth = useFidoAuth();

const schema = z.object({
  rp: z.string(),
  email: z.string().email("Invalid email"),
  challenge: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  rp: "localhost",
  email: undefined,
  challenge: undefined,
});

async function register(state: Schema) {
  const response = await startRegistration({
    optionsJSON: {
      rp: {
        name: state.rp,
      },
      user: {
        id: state.email,
        name: state.email,
        displayName: state.email,
      },
      challenge: state.challenge,
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -257,
        },
      ],
    }
  })
  console.log(state);
  fidoSign.value = response;
  navigateTo('/code')
}

async function auth(state: Schema) {
    const response = await startAuthentication({
        optionsJSON: {
            challenge: state.challenge,
            rpId: state.rp,
        },
    })
    console.log(state);
    fidoAuth.value = response;
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UForm :schema="schema" :state="state" class="space-y-4">
      <UFormGroup label="RP" name="rp">
        <UInput v-model="state.rp" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
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
