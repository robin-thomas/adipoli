import { Box } from '@material-ui/core';

import Layout from '../layout';
import Balance from '../wallet/balance';
import useUser from '../utils/useUser';

const Page = ({ title, fetcher, end, children }) => {
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
