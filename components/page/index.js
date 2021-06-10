import { useContext, useEffect } from 'react';
import { Box } from '@material-ui/core';

import Layout from '../layout';
import Balance from './balance';
import useUser from '../utils/useUser';
import { DataContext } from '../utils/DataProvider';

const Page = ({ title, name, fetcher, end, children }) => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    if (name) {
      ctx.setActive(name);
    }
  }, [ctx.setActive, name]);

  const { user } = useUser({ redirectTo: '/login' });
  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <Layout title={title}>
      <Balance fetcher={fetcher} end={end} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '15px 0',
        }}
      >
        {children}
      </Box>
    </Layout>
  );
};

export default Page;
