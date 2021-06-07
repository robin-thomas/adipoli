import fetchJson from '../../utils/fetchJson';
import Transactions from '../page/transactions';

const AccountTransactions = () => {
  const fetcher = async (walletId, setter) => {
    try {
      const url = `/api/wallet/${walletId}/transactions`;
      const resp = await fetchJson(url);
      setter(resp.transactions);
    } catch (err) {
      // TODO.
    }
  };

  return <Transactions fetcher={fetcher} />;
};

export default AccountTransactions;
