import type { RegistrationJSON, AuthenticationJSON } from '@passwordless-id/webauthn/dist/esm/types';

const useFidoSign = () => useState<RegistrationJSON>();
const useFidoAuth = () => useState<AuthenticationJSON>();

export { useFidoSign, useFidoAuth };