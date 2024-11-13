<script setup lang="ts">
import {z} from "zod";
import {startAuthentication, startRegistration} from '@simplewebauthn/browser';
import { client } from '@passwordless-id/webauthn';
const url = useRequestURL();
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
  rp: url.hostname,
  id: process.env.NUXT_PUBLIC_ID || undefined,
  name: process.env.NUXT_PUBLIC_NAME || undefined,
  displayName: process.env.NUXT_PUBLIC_DISPLAY_NAME || undefined,
  challenge: undefined,
});

async function register(state: Schema) {
  const options = {
    rp: {
      id: state.rp,
      name: state.rp,
    },
    user: {
      id: state.id,
      name: state.name,
      displayName: state.displayName,
    },
    challenge: state.challenge,
    pubKeyCredParams: [
      { alg: -257, type: 'public-key' },
    ] as PublicKeyCredentialParameters[],
    timeout: 60000,
    excludeCredentials: [],
  }
  try {
    const response = await startRegistration({optionsJSON: options});
    console.log(response);
    fidoSign.value = response!;
    navigateTo("/code");
  } catch (error) {
    console.error(error);
  }
}

async function auth(state: Schema) {
  try {
    const options = {
      challenge: state.challenge,
      rpId: state.rp,
      userVerification: 'required',
    }
    const response = await startAuthentication({optionsJSON: options});
    console.log(response);
    fidoAuth.value = response!;
    navigateTo("/code");
  } catch (error) {
    console.error(error);
  }
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
