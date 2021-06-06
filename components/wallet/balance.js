import { useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

const Balance = () => {
  const ctx = useContext(DataContext);

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fn = async () => {
      try {
        const url = `/api/wallet/${ctx.user.walletId}`;
        const resp = await fetchJson(url, { method: 'GET' });

        setBalance(resp.balance);
      } catch (err) {
        // TODO.
      }
    };

    if (ctx.user?.walletId) {
      fn();
    }
  }, [ctx.user, ctx.toppedUp]);

  return (
    <Box sx={{ pt: 5, pb: 0 }}>
      <h1>${balance?.toLocaleString()}</h1>
      <p>
        Total balance in <b>USD</b>
      </p>
    </Box>
  );
};

export default Balance;
