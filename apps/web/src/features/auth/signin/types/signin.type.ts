export {
  signInSchema as signinSchema,
  type SignInDTO as SigninFormData,
} from '@siklo/shared-schemas';

import type { SignInDTO } from '@siklo/shared-schemas';

export type SigninErrors = Partial<Record<keyof SignInDTO, string>>;

