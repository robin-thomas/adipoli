import { createContext, useEffect, useState } from 'react';

import fetchJson from '../../utils/fetchJson';
import Airports from '../../config/airports.json';
import config from '../../config/config.json';

const DataContext = createContext();

const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('wallet');
  const [toppedUp, setToppedUp] = useState(0);
  const [prices, setPrices] = useState({});
  const [balances, setBalances] = useState({});
  const [portfolio, setPortfolio] = useState(null);

  const [airports] = useState(Airports);

  const [validAirports, setValidAirports] = useState({
    from: false,
    to: false,
    date: false,
  });

  const [searchAirports, setSearchAirports] = useState({
    from: null,
    to: null,
    date: null,
  });

  const [flight, setFlight] = useState({
    code: null,
    name: null,
    departureTime: null,
  });

  const [openAbout, setOpenAbout] = useState(false);
  const [policy, setPolicy] = useState(null);
  const [policyProducts, setPolicyProducts] = useState(config.app.policy);

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

  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await fetchJson(`/api/crypto/${user.walletId}/portfolio`);
        setPortfolio(resp.portfolio);
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
        portfolio,
        setPortfolio,
        airports,
        validAirports,
        setValidAirports,
        searchAirports,
        setSearchAirports,
        flight,
        setFlight,
        openAbout,
        setOpenAbout,
        policy,
        setPolicy,
        policyProducts,
        setPolicyProducts,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
