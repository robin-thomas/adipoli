import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Page from '../components/page';
import Tabs from '../components/crypto/tabs';
import Transactions from '../components/crypto/transactions';

import fetchJson from '../utils/fetchJson';

const Crypto = () => {
  const fetcher = async (setter, walletId) => {
    try {
      const url = `/api/crypto/${walletId}`;
      const resp = await fetchJson(url);
      setter(resp.balance);
    } catch (err) {
      // TODO.
    }
  };

  return (
    <Page title="Cryptocurrencies" fetcher={fetcher}>
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

export default Crypto;
