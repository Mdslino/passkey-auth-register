<script setup lang="ts">
import { z } from "zod";
import { client } from "@passwordless-id/webauthn";
useHead({
  title: "Passkey Auth",
});

const fidoSign = useFidoSign();
const fidoAuth = useFidoAuth();

const schema = z.object({
  email: z.string().email("Invalid email"),
  challenge: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  challenge: undefined,
});

async function register(state: Schema) {
  const response = await client.register({
    user: {
        id: state.email,
        name: state.email,
        displayName: state.email,
    },
    challenge: state.challenge,
  })
  console.log(state);
  fidoSign.value = response;
  navigateTo('/code')
}

async function auth(state: Schema) {
    const response = await client.authenticate({
        challenge: state.challenge,
    })
    console.log(state);
    fidoAuth.value = response;
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <UForm :schema="schema" :state="state" class="space-y-4">
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
