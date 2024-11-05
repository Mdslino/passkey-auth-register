import type {
    AuthenticationResponseJSON,
    RegistrationResponseJSON,
  } from '@simplewebauthn/types';

const useFidoSign = () => useState<RegistrationResponseJSON>();
const useFidoAuth = () => useState<AuthenticationResponseJSON>();

export { useFidoSign, useFidoAuth };