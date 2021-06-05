import { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState('wallet');

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        active,
        setActive,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
