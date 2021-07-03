import { useContext, useState } from 'react';

import { Alert, Box, Button } from '@material-ui/core';

import { withdraw, createPolicy } from '../../../utils/api';
import { DataContext } from '../../utils/DataProvider';

// import contract from "../../../truffle/_build/contracts/Adipoli.json";
// import config from "../../../config/config.json";
//
// const ethAddress = contract.networks[config.app.network.network_id].address;
// const network = config.app.network.name;

const StepperPayment = ({ amount, eth, cb }) => {
  const ctx = useContext(DataContext);

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(eth === 0);

  const payment = async () => {
    setError('');
    setDisabled(true);

    // Make a transfer of amount from user wallet to client wallet.
    // try {
    //   await withdraw({ amount, walletId: ctx.user.walletId });
    // } catch (err) {
    //   setDisabled(false);
    //   return setError(err?.response?.data?.error || 'Failed to pay');
    // }

    try {
      await createPolicy(ctx.policy);
    } catch (err) {
      setDisabled(false);
      return setError(err?.response?.data?.error || 'Failed to pay');
    }

    // Policy exists at this point.
    cb();
  };

  return (
    <>
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Button variant="contained" disabled={disabled} onClick={payment}>
        Pay ${amount} from your wallet
      </Button>
    </>
  );
};

export default StepperPayment;
