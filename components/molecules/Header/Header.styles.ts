import { createStyles } from '@mantine/core';
import { HEADER_HEIGHT } from '../../../constants/styles';

export default createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    [theme.fn.smallerThan('lg')]: {
      '& > a': {
        display: 'none',
      },
    },
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  dropdownSearch: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  links: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '6px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    '&:active': theme.activeStyles,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('lg')]: {
      borderRadius: 0,
      padding: 0,
    },
  },

  linkActive: {
    [theme.fn.largerThan('lg')]: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
    '&, &:hover': {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));
