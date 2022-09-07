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
import { FULL_PAGE } from '../constants/styles';

export default function LoginPage() {
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
          <Stack spacing="xs">
            <TextInput label="Username" placeholder="10xDeveloper" required />
            <TextInput label="Email" placeholder="you@mantine.dev" required />
            <PasswordInput label="Password" placeholder="Your password" required />
          </Stack>

          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Box>
    </Stack>
  );
}
