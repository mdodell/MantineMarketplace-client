import React from 'react';

import Header from '@components/molecules/Header';
import { LINKS } from '@constants/routes';
import { Loader } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { isLoading } = useUser();
  return (
    <>
      <Header links={LINKS} />

      {isLoading ? <Loader /> : children}
    </>
  );
}
