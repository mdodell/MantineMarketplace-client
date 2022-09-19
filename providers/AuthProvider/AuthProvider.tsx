import User from '@models/User';
import AuthClient, {
  LoginParameters,
  SignUpParameters,
  UserResponse,
  USER_SWR_KEY,
} from '@services/AuthClient';
import { UseMutateFunction, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface AuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  isFetched: boolean;
  signUpFn: UseMutateFunction<UserResponse, AxiosError, SignUpParameters>;
  loginFn: UseMutateFunction<UserResponse, AxiosError, LoginParameters>;
  logoutFn: UseMutateFunction<unknown, AxiosError>;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => null,
  isLoading: false,
  isFetched: false,
  signUpFn: () => {},
  loginFn: () => {},
  logoutFn: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContext['user']>(null);

  // Fetch initial user profile
  const { isLoading, isFetched } = useQuery([USER_SWR_KEY], AuthClient.profile, {
    enabled: !user,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    onSuccess: (userResponse) => {
      setUser(userResponse.user);
    },
    onError: (err) => console.log({ err }),
  });

  const { mutate: signUpFn } = useMutation<UserResponse, AxiosError, SignUpParameters>(
    [USER_SWR_KEY],
    AuthClient.signUp,
    { onSuccess: (userResponse) => setUser(userResponse.user) }
  );

  const { mutate: loginFn } = useMutation<UserResponse, AxiosError, LoginParameters>(
    [USER_SWR_KEY],
    AuthClient.login,
    { onSuccess: (userResponse) => setUser(userResponse.user) }
  );

  const { mutate: logoutFn } = useMutation<unknown, AxiosError>([USER_SWR_KEY], AuthClient.logout, {
    onSuccess: () => setUser(null),
  });

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isFetched, signUpFn, loginFn, logoutFn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider context!');
  }
  return context;
}

export default AuthProvider;
