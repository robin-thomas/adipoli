import { createContext, useEffect, useState } from 'react';

import fetchJson from '../../utils/fetchJson';

const DataContext = createContext();

const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('wallet');
  const [toppedUp, setToppedUp] = useState(0);
  const [prices, setPrices] = useState({});
  const [balances, setBalances] = useState({});

  useEffect(() => {
    (async () => {
      const resp = await fetchJson('/api/session/user');

      if (resp?.isLoggedIn) {
        setUser(resp);
      }
    })();
  }, []);

  useEffect(() => {
    let timerId = null;

    const fn = async () => {
      try {
        const resp = await fetchJson('/api/crypto/prices');
        setPrices(resp.prices);

        timerId = setInterval(fn, 10 * 60 * 1000);
      } catch (err) {
        // TODO
      }
    };

    if (user?.isLoggedIn) {
      fn();

      return () => clearInterval(timerId);
    }
  }, [user]);

  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await fetchJson(`/api/crypto/${user.walletId}/balance`);
        setBalances(resp.tokens);
      } catch (err) {
        // TODO
      }
    };

    if (user?.isLoggedIn) {
      fn();
    }
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        setActive,
        toppedUp,
        setToppedUp,
        prices,
        setPrices,
        balances,
        setBalances,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
