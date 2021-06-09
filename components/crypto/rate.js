import { Box, Skeleton } from '@material-ui/core';

import styles from './rate.module.css';

const CryptoRate = ({ prices, rate }) => (
  <Box sx={{ mt: 2, mb: 5 }}>
    {Object.keys(prices).length === 0 ? (
      <Skeleton variant="text" animation="wave" />
    ) : (
      <p className={styles.price}>{rate}</p>
    )}
  </Box>
);

export default CryptoRate;
