import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Layout from '../layout';
import Balance from '../wallet/balance';
import TopUpTransfer from '../wallet/topup-transfer';
import Transactions from '../wallet/transactions';
import useUser from '../utils/useUser';

const Page = ({ title, fetcher, children }) => {
  const { user } = useUser({ redirectTo: '/login' });
  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <Layout title={title}>
      <Balance fetcher={fetcher} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '15px 0',
        }}
      >
        {children}
      </Box>
    </Layout>
  );
};

export default Page;
