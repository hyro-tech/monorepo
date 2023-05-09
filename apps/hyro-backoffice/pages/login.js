import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { userRolesType } from 'lib-enums';

import { COOKIES_NAMES, PATHS, setCookie } from '../src/utils';
import { getAdmin } from '../src/actions/admin';

const LoginPage = ({ query }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (query?.access_token) {
      setCookie(COOKIES_NAMES.token, query?.access_token);
      getAdmin().then((ret) => {
        if (ret?.response?.role === userRolesType.admin) {
          dispatch(ret);
          router.push(query?.source || PATHS.ITEMS);
        } else {
          router.push(PATHS.SIGN_IN);
        }
      });
    } else {
      router.push(PATHS.SIGN_IN);
    }
  }, []);

  return <div />;
};

LoginPage.getInitialProps = ({ query }) => {
  return { query };
};

export default LoginPage;
