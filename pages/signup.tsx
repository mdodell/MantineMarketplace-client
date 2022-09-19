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
import Link from 'next/link';
import { useForm, zodResolver } from '@mantine/form';
import { useAuth } from '@providers/AuthProvider';
import { SignUpParameters, signUpSchema } from '@services/AuthClient';
import { ROUTES } from '@constants/routes';
import { FULL_PAGE } from '../constants/styles';

export default function SignupPage() {
  const form = useForm<SignUpParameters>({
    initialValues: {
      userName: '',
      login: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: zodResolver(signUpSchema),
  });

  const { signUpFn } = useAuth();

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
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?
          <Link href={ROUTES.LOGIN} passHref>
            <Anchor<'a'> size="sm" ml="xs">
              Login
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => signUpFn(values))} noValidate>
            <Stack spacing="xs">
              <TextInput
                label="Username"
                placeholder="10xDeveloper"
                required
                {...form.getInputProps('userName')}
              />
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
              <PasswordInput
                label="Confirm Password"
                placeholder="Your password"
                required
                {...form.getInputProps('passwordConfirmation')}
              />
            </Stack>

            <Group position="right" mt="md">
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign up
            </Button>
          </form>
        </Paper>
      </Box>
    </Stack>
  );
}
