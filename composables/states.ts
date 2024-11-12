import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/types";

const useFidoSign = () => useState<RegistrationResponseJSON>();
const useFidoAuth = () => useState<AuthenticationResponseJSON>();

export { useFidoSign, useFidoAuth };
