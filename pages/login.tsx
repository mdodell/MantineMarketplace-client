import { ROUTES } from '@constants/routes';
import Link from 'next/link';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Stack,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAuth } from '@providers/AuthProvider';
import { LoginParameters, loginSchema } from '@services/AuthClient';
import { FULL_PAGE } from '../constants/styles';

export default function LoginPage() {
  const form = useForm<LoginParameters>({
    initialValues: {
      login: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const { loginFn } = useAuth();

  return (
    <Stack
      justify="center"
      align="center"
      mx="xl"
      sx={() => ({
        height: FULL_PAGE,
      })}
    >
      <Box
        sx={() => ({
          maxWidth: '980px',
          width: '100%',
        })}
      >
        <Title align="center" sx={() => ({ fontWeight: 900 })}>
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don&apos;t already have an account?
          <Link href={ROUTES.SIGNUP} passHref>
            <Anchor<'a'> size="sm" ml="xs">
              Register
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((formData) => loginFn(formData))} noValidate>
            <Stack spacing="xs">
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps('login')}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />
            </Stack>

            <Group position="right" mt="md">
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
}
