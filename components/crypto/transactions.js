import fetchJson from '../../utils/fetchJson';
import Transactions from '../page/transactions';

const CryptoTransactions = () => {
  const fetcher = async (walletId, setter) => {
    try {
      const url = `/api/crypto/${walletId}/transactions`;
      const resp = await fetchJson(url);
      setter(resp.transactions);
    } catch (err) {
      // TODO.
    }
  };

  return <Transactions fetcher={fetcher} height={300} />;
};

export default CryptoTransactions;
