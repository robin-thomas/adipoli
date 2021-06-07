import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Balance from '../amount/balance';

const AccountBalance = ({ fetcher, end }) => (
  <Row>
    <Col md="auto">
      <Balance fetcher={fetcher} />
    </Col>
    <Col md="auto" className="ml-auto mr-4">
      <Box sx={{ mt: 2, pt: 5, pb: 0 }}>{end}</Box>
    </Col>
  </Row>
);

export default AccountBalance;
