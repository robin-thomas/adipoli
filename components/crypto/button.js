import { Button } from '@material-ui/core';

import tokens from '../../tokens.json';

const CryptoButton = ({ isSubmitting, values, title }) => (
  <Button
    color="primary"
    disabled={isSubmitting || !values.amount || values.amount === '0'}
    size="large"
    type="submit"
    variant="contained"
    fullWidth
    style={{ boxShadow: '0 0 3em rgb(0,0,0,0.1)' }}
  >
    {title} {tokens[values.token].name}
  </Button>
);

export default CryptoButton;
