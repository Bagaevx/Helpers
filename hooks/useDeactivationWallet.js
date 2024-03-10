import { useWeb3React } from '@web3-react/core';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { AuthRepository } from 'connectors/repositories/auth';
import { clearAuthUser } from 'store/userSlice';
import { getAuthUser } from 'store/userSlice/selectors';

const useDeactivationWallet = () => {
  const { account, connector } = useWeb3React();
  const authProfile = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const deactivationWallet = async () => {
    if (!!account) {
      try {
        if (authProfile.id) {
          await AuthRepository.logout();
        }

        if (connector?.deactivate) {
          void connector.deactivate();
        } else {
          void connector.resetState();
        }
      } catch (ex) {
        console.error(ex);
      }
      destroyCookie(null, 'apiToken', {
        path: '/',
      });
      dispatch(clearAuthUser());
      push('/');
    }
  };

  return {
    deactivationWallet,
  };
};

export default useDeactivationWallet;
