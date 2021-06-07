import { createContext, useEffect, useState } from 'react';

import fetchJson from '../../utils/fetchJson';

const DataContext = createContext();

const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('wallet');
  const [toppedUp, setToppedUp] = useState(0);

  useEffect(() => {
    const fn = async () => {
      const resp = await fetchJson('/api/session/user');

      if (resp?.isLoggedIn) {
        setUser(resp);
      }
    };

    fn();
  }, []);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        setActive,
        toppedUp,
        setToppedUp,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
