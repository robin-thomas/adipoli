import CreditCard from '../credit-card';

const TopUp = ({ name, walletId, amount }) => (
  <CreditCard name={name} walletId={walletId} amount={amount} />
);

export default TopUp;
