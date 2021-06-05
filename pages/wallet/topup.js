import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Layout from '../../components/layout';
import CreditCard from '../../components/credit-card';

const Wallet = () => {
  return (
    <Layout title="Top Up your wallet">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '10px 50px',
        }}
      >
        <Row>
          <Col md="5" className="mx-auto">
            <CreditCard />
          </Col>
        </Row>
      </Box>
    </Layout>
  );
};

export default Wallet;
