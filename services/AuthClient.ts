import User from '@models/User';
import { privateAxiosInstance } from '@utils/requests';
import { z } from 'zod';

const BASE_AUTH_URL = '/auth';

export const signUpSchema = z
  .object({
    userName: z
      .string({
        required_error: 'Username is required',
      })
      .min(5, { message: 'Must be 5 or more characters long' })
      .max(20, { message: 'Must be 20 or fewer characters long' }),
    login: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(5, { message: 'Must be 5 or more characters long' })
      .max(20, { message: 'Must be 20 or fewer characters long' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type SignUpParameters = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  login: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(5, { message: 'Must be 5 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
});

export type LoginParameters = z.infer<typeof loginSchema>;

export interface UserResponse {
  user: User;
}

export const USER_SWR_KEY = '/api/user';

class AuthClient {
  static signUp(params: SignUpParameters) {
    return privateAxiosInstance
      .post<UserResponse>(`${BASE_AUTH_URL}/create-account`, params)
      .then(({ data }) => data);
  }

  static login(params: LoginParameters) {
    return privateAxiosInstance
      .post<UserResponse>(`${BASE_AUTH_URL}/login`, params)
      .then(({ data }) => data);
  }

  static profile() {
    return privateAxiosInstance
      .get<UserResponse>(`${BASE_AUTH_URL}/profile`)
      .then(({ data }) => data);
  }

  static logout() {
    return privateAxiosInstance
      .post(`${BASE_AUTH_URL}/logout`, { data: {} })
      .then(({ data }) => data);
  }
}

export default AuthClient;
