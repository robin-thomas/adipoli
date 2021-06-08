import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Page from '../components/page';
import Tabs from '../components/wallet/tabs';
import Transactions from '../components/wallet/transactions';
import RequestPayment from '../components/wallet/requestPayment';

import fetchJson from '../utils/fetchJson';

const Wallet = () => {
  const fetcher = async (setter, walletId) => {
    try {
      const url = `/api/wallet/${walletId}`;
      const resp = await fetchJson(url, { method: 'GET' });
      setter(resp.balance);
    } catch (err) {
      // TODO.
    }
  };

  return (
    <Page
      title="Wallet"
      name="wallet"
      fetcher={fetcher}
      end={<RequestPayment />}
    >
      <Row>
        <Col md="4">
          <Box sx={{ mt: 1 }}>
            <Tabs />
          </Box>
        </Col>
        <Col md="7" className="mx-auto">
          <Transactions />
        </Col>
      </Row>
    </Page>
  );
};

export default Wallet;
