import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  Stack,
} from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { FULL_PAGE } from '../constants/styles';

const loginSchema = z
  .object({
    username: z
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    initialValues: {
      username: '',
      login: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(loginSchema),
  });

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
          Do not have an account yet?
          <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()} ml="xs">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => console.log('values'))} noValidate>
            <Stack spacing="xs">
              <TextInput
                label="Username"
                placeholder="10xDeveloper"
                required
                {...form.getInputProps('username')}
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
                {...form.getInputProps('confirmPassword')}
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
