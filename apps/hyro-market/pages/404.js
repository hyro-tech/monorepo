import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { PATHS } from '../src/utils';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router?.replace(PATHS.HOME);
  }, []);

  return <div />;
};

export default NotFound;
