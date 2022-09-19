const DEVELOPMENT_URL = 'http://localhost:3001';
const PRODUCTION_URL = '';

export const getAPIUrl = () => {
  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case 'production':
      return PRODUCTION_URL;
    case 'development':
    default:
      return DEVELOPMENT_URL;
  }
};
