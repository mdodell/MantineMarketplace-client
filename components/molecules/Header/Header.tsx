import { useState, SetStateAction, Dispatch } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Header,
  Autocomplete,
  Group,
  Burger,
  Paper,
  Transition,
  TextInput,
  UnstyledButton,
  Button,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { HEADER_HEIGHT } from '@constants/styles';
import { IconLogout, IconSearch } from '@tabler/icons';

import ColorSchemeToggle from '@components/atoms/ColorSchemeToggle';
import { MantineLogo } from '@components/atoms/MantineLogo';

import UserMenu from '@components/atoms/UserMenu';
import { useAuth } from '@providers/AuthProvider';
import { ROUTES } from '@constants/routes';
import useStyles from './Header.styles';

interface Link {
  link: string;
  label: string;
  icon: React.ReactNode;
}

interface HeaderResponsiveProps {
  leftLinks: Link[];
  rightLinks: Link[];
}

const StyledLink = ({
  link,
  setActive,
  close,
  active,
  cx,
  classes,
}: {
  link: Link;
  setActive: Dispatch<SetStateAction<string>>;
  active: string;
  close: () => void;
  cx: ReturnType<typeof useStyles>['cx'];
  classes: ReturnType<typeof useStyles>['classes'];
}) => (
  <Link href={link.link} passHref>
    <UnstyledButton<'a'>
      component="a"
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      <Group spacing="xs">
        {link.icon}
        {link.label}
      </Group>
    </UnstyledButton>
  </Link>
);

export default function HeaderResponsive({ leftLinks, rightLinks }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, logoutFn } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState(router.asPath);
  const { classes, cx } = useStyles();

  const rightItems = rightLinks.map((link) => (
    <StyledLink
      key={link.label}
      link={link}
      setActive={setActive}
      active={active}
      cx={cx}
      classes={classes}
      close={close}
    />
  ));

  const leftItems = leftLinks.map((link) => (
    <StyledLink
      key={link.label}
      link={link}
      setActive={setActive}
      active={active}
      cx={cx}
      classes={classes}
      close={close}
    />
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <div className={classes.inner}>
        <Group className={classes.logo}>
          <MantineLogo size={28} />
          {leftItems}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[]}
          />
        </Group>

        <Group spacing="xs" className={classes.links}>
          {rightItems}
          {!user && <Button onClick={() => router.push(ROUTES.LOGIN)}>Login</Button>}
          {user && <UserMenu />}

          <ColorSchemeToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles} p="md">
              <Stack spacing="md">
                {leftItems}
                {rightItems}

                {!user && (
                  <Link href={ROUTES.LOGIN} passHref>
                    <Button component="a" fullWidth onClick={() => close()}>
                      Login
                    </Button>
                  </Link>
                )}
                {user && (
                  <UnstyledButton component="a" className={classes.link} onClick={() => logoutFn()}>
                    <Group
                      spacing="xs"
                      sx={(theme) => ({
                        color: theme.colors.red[theme.fn.primaryShade()],
                      })}
                    >
                      <IconLogout />
                      Logout
                    </Group>
                  </UnstyledButton>
                )}

                <ColorSchemeToggle />
                <TextInput
                  className={classes.dropdownSearch}
                  placeholder="Search"
                  icon={<IconSearch size={16} stroke={1.5} />}
                />
              </Stack>
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  );
}
