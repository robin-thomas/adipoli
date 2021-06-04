import Link from 'next/link';
import { Box } from '@material-ui/core';

import Card from '../components/card';
import MainLayout from '../components/MainLayout';
import useUser from '../components/lib/useUser';
import CreditCard from '../components/credit-card';

const Wallet = () => {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <MainLayout title="Adipoli | Wallet">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div className="row">
          <div className="col-4">
            <CreditCard />
          </div>
        </div>
      </Box>
    </MainLayout>
  );
};

export default Wallet;
