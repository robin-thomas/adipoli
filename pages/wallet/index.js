import { useContext } from 'react';
import { Box } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import SubjectIcon from '@material-ui/icons/Subject';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/card';
import MainLayout from '../../components/MainLayout';
import useUser from '../../components/lib/useUser';
import { DataContext } from '../../components/utils/DataProvider';

const Wallet = () => {
  const ctx = useContext(DataContext);
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return null;
  } else if (!ctx.user) {
    ctx.setUser(user);
  }

  const nav = {
    topup: {
      href: '/wallet/topup',
      icon: <PaymentIcon fontSize="large" />,
    },
    transfer: {
      href: '/wallet/transfer',
      icon: <TrendingUpIcon fontSize="large" />,
    },
    transactions: {
      href: '/wallet/transactions',
      icon: <SubjectIcon fontSize="large" />,
    },
  };

  return (
    <MainLayout title="Adipoli | Wallet">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '10px 20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '15%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '10px 20px',
          }}
        >
          <h1>Now choose your wallet operation</h1>
        </Box>
        <Row className="justify-content-md-center">
          {Object.keys(nav).map((title) => (
            <Col md="auto" key={title}>
              <Card
                href={nav[title].href}
                title={title}
                icon={nav[title].icon}
              />
            </Col>
          ))}
        </Row>
      </Box>
    </MainLayout>
  );
};

export default Wallet;
