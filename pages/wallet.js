import { useContext } from 'react';
import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout';
import Balance from '../components/wallet/balance';
import TopUpTransfer from '../components/wallet/topup-transfer';
import Transactions from '../components/wallet/transactions';
import { DataContext } from '../components/utils/DataProvider';
import useUser from '../components/lib/useUser';

const Wallet = () => {
  const ctx = useContext(DataContext);

  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return null;
  } else if (!ctx.user?.walletId) {
    ctx.setUser(user);
  }

  return (
    <Layout title="Wallet">
      <Balance />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '25px 0',
        }}
      >
        <Row>
          <Col md="4">
            <TopUpTransfer />
          </Col>
          <Col md="7" className="mx-auto">
            <Transactions />
          </Col>
        </Row>
      </Box>
    </Layout>
  );
};

export default Wallet;
