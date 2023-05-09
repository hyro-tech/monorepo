import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { userRolesType } from 'lib-enums';

import { PATHS } from '../../utils';
import { disconnectAdmin, getAdmin } from '../../actions/admin';

const LayoutPermissions = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [access, setAccess] = useState(false);

  const fetch = async () => {
    const ret = await getAdmin();

    if (ret) {
      const { response: user } = ret;

      if (user) {
        dispatch(ret);

        if (user.role !== userRolesType.admin) {
          dispatch(disconnectAdmin());
          await router.push(PATHS.SIGN_IN);
        } else {
          setAccess(true);
        }
      } else {
        await router.push(PATHS.SIGN_IN);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!access) return <div />;
  return <>{children}</>;
};

export default LayoutPermissions;
