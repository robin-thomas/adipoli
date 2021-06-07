import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Balance from '../amount/balance';
import RequestPayment from './requestPayment';

const AccountBalance = ({ fetcher }) => (
  <Row>
    <Col md="auto">
      <Balance fetcher={fetcher} />
    </Col>
    <Col md="auto" className="ml-auto mr-4">
      <Box sx={{ mt: 2, pt: 5, pb: 0 }}>
        <RequestPayment />
      </Box>
    </Col>
  </Row>
);

export default AccountBalance;
