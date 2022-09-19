declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ENVIRONMENT: 'development' | 'production' | 'staging' | 'preview';
      NEXT_PUBLIC_VERCEL_URL: string;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
