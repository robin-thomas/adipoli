import { useContext } from 'react';
import { Box } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import SubjectIcon from '@material-ui/icons/Subject';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/card';
import Layout from '../../components/layout';
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
    <Layout title="Wallet">
      <Row style={{ height: '100%' }}>
        <Col md="2" style={{ background: 'rgba(0,0,0,0.1)' }}>
          {Object.keys(nav).map((title) => (
            <Card href={nav[title].href} title={title} icon={nav[title].icon} />
          ))}
        </Col>
        <Col md="8"></Col>
      </Row>
    </Layout>
  );
};

export default Wallet;
