import { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = (props) => {
  const [user, setUser] = useState(null);

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataProvider;
