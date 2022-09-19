import { IconBrandCodesandbox, IconBuildingCommunity, IconHome } from '@tabler/icons';

const COMMUNITY_COMPONENTS = '/community-components';
const PLAYGROUND = '/playground';
const LOGIN = '/login';
const SIGNUP = '/signup';
const HOME = '/';

export const ROUTES = {
  COMMUNITY_COMPONENTS,
  PLAYGROUND,
  LOGIN,
  SIGNUP,
} as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP] as const;
export const HYBRID_ROUTES = [ROUTES.COMMUNITY_COMPONENTS, ROUTES.PLAYGROUND] as const;

export const RIGHT_LINKS = [
  { link: PLAYGROUND, label: 'Create Component', icon: <IconBrandCodesandbox /> },
];

export const LEFT_LINKS = [
  { link: HOME, label: 'Home', icon: <IconHome /> },
  {
    link: COMMUNITY_COMPONENTS,
    label: 'Community Components',
    icon: <IconBuildingCommunity />,
  },
];
