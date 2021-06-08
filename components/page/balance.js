import { useContext, useState, useEffect } from 'react';
import { Box, Skeleton } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import { DataContext } from '../utils/DataProvider';

const Balance = ({ fetcher, end }) => {
  const ctx = useContext(DataContext);

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (ctx.user?.walletId) {
      fetcher(setBalance, ctx.user.walletId);
    }
  }, [ctx.user, ctx.toppedUp, setBalance, fetcher]);

  return (
    <Row>
      <Col md="auto">
        <Box sx={{ pt: 5, pb: 0 }}>
          {balance === null ? (
            <Skeleton
              animation="wave"
              variant="rect"
              width={175}
              height={100}
            />
          ) : (
            <>
              <h1>${balance.toLocaleString()}</h1>
              <p>
                Total balance in <b>USD</b>
              </p>
            </>
          )}
        </Box>
      </Col>
      <Col md="auto" className="ml-auto mr-4">
        <Box sx={{ mt: 2, pt: 5, pb: 0 }}>{end}</Box>
      </Col>
    </Row>
  );
};

export default Balance;
