import { Loader, Stack, Title, useMantineTheme } from '@mantine/core';

function FullPageLoader() {
  const theme = useMantineTheme();
  return (
    <Stack
      align="center"
      justify="center"
      sx={() => ({
        width: '100vw',
        height: '100vh',
      })}
    >
      <Loader size="xl" variant="bars" />
      <Title color={theme.colors[theme.primaryColor][theme.fn.primaryShade()]}>Loading</Title>
    </Stack>
  );
}

export default FullPageLoader;
