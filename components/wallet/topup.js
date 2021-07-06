import CreditCard from '../credit-card';

import styles from './transfer.module.css';

const TopUp = ({ name, walletId, amount }) => (
  <>
    <p className={styles.text}>
      Fill in your <b>credit card</b> details and the <b>amount</b> to topup.
    </p>
    <CreditCard name={name} walletId={walletId} amount={amount} />
  </>
);

export default TopUp;
