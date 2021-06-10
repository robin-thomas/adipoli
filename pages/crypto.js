import { Box } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Page from '../components/page';
import Tabs from '../components/crypto/tabs';
import Graph from '../components/crypto/graph';
import DoughtNut from '../components/crypto/doughnut';
import Transactions from '../components/crypto/transactions';

import fetchJson from '../utils/fetchJson';

const Crypto = () => {
  const fetcher = async (setter, walletId) => {
    try {
      const url = `/api/crypto/${walletId}`;
      const resp = await fetchJson(url);
      setter(resp.portfolio.balance);
    } catch (err) {
      // TODO.
    }
  };

  return (
    <Page title="Cryptocurrencies" name="crypto" fetcher={fetcher}>
      <Row>
        <Col md="4">
          <Box sx={{ mt: 1 }}>
            <Tabs />
          </Box>
        </Col>
        <Col md="7" className="mx-auto">
          <Box sx={{ mb: 6, mt: -13 }}>
            <Row>
              <Col md="auto" className="mr-auto">
                <Graph />
              </Col>
              <Col md="auto" className="ml-auto">
                <DoughtNut />
              </Col>
            </Row>
          </Box>
          <Transactions />
        </Col>
      </Row>
    </Page>
  );
};

export default Crypto;
