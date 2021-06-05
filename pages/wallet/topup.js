import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import MainLayout from '../../components/MainLayout';
import CreditCard from '../../components/credit-card';

const Wallet = () => {
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
        <Row>
          <Col md="5" className="mx-auto">
            <CreditCard />
          </Col>
        </Row>
      </Box>
    </MainLayout>
  );
};

export default Wallet;
