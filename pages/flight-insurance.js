import Layout from '../components/layout';
import useUser from '../components/utils/useUser';

const FlightInsurance = () => {
  const { user } = useUser({ redirectTo: '/login' });

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <Layout title="Flight Insurance">
      <h1 className="title">
        Flight <span>Insurance</span>
      </h1>
    </Layout>
  );
};

export default FlightInsurance;
