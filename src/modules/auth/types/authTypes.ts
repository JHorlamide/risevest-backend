export type Jwt = {
  _id: string;
  userId: string;
  refreshKey: string;
};

export interface ResetPassword {
  password: string;
  confirmPassword: string;
  passwordToken: string;
}

export type ValidatePassword = Pick<ResetPassword, "password" | "confirmPassword">;
