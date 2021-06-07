import { useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { DataContext } from '../utils/DataProvider';

const Balance = ({ fetcher }) => {
  const ctx = useContext(DataContext);

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (ctx.user?.walletId) {
      fetcher(setBalance, ctx.user.walletId);
    }
  }, [ctx.user, ctx.toppedUp, setBalance, fetcher]);

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
