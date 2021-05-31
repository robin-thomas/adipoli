import Link from 'next/link'

import Card from '../components/card';
import MainLayout from '../components/MainLayout';
import useUser from '../components/lib/useUser';

const FlightInsurance = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <MainLayout title="Flight Insurance">
      <h1 className="title">
        Flight <span>Insurance</span>
      </h1>
    </MainLayout>
  )
};

export default FlightInsurance;
