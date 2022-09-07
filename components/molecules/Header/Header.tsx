import { useState } from 'react';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { HEADER_HEIGHT } from '@constants/styles';
import { IconSearch } from '@tabler/icons';

import ColorSchemeToggle from '@components/atoms/ColorSchemeToggle';
import { MantineLogo } from '@components/atoms/MantineLogo';

import useStyles from './Header.styles';

interface Link {
  link: string;
  label: string;
  icon: React.ReactNode;
}

interface HeaderResponsiveProps {
  links: Link[];
}

export default function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const [active, setActive] = useState(router.asPath);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link href={link.link} passHref key={link.label}>
      <UnstyledButton
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
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.header}>
      <div className={classes.inner}>
        <MantineLogo size={28} />
        <Group spacing={5} className={classes.links}>
          {items}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[]}
          />
          <ColorSchemeToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <TextInput placeholder="Search" icon={<IconSearch size={16} stroke={1.5} />} m="xl" />
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  );
}
