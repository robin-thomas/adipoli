import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout';
import TopUpTransfer from '../components/topup-transfer';

const Wallet = () => {
  return (
    <Layout title="Wallet">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '10px 0',
        }}
      >
        <Row>
          <Col md="4">
            <TopUpTransfer />
          </Col>
        </Row>
      </Box>
    </Layout>
  );
};

export default Wallet;
