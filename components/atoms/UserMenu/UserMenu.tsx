import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useAuth } from '@providers/AuthProvider';
import { IconChevronDown, IconChevronUp, IconLogout } from '@tabler/icons';
import { useState } from 'react';
import useStyles from './UserMenu.styles';

function UserMenu() {
  const { logoutFn, user } = useAuth();
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user?.userName}
            </Text>
            {userMenuOpened ? (
              <IconChevronUp size={12} stroke={1.5} />
            ) : (
              <IconChevronDown size={12} stroke={1.5} />
            )}
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>My Components</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => logoutFn()}
          icon={<IconLogout size={14} stroke={1.5} />}
          color="red"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
