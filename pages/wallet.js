import Link from 'next/link'

import Card from '../components/card';
import MainLayout from '../components/MainLayout';
import useUser from '../components/lib/useUser';
import CreditCard from '../components/credit-card';

const Wallet = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <MainLayout title="Adipoli | Wallet">
      <CreditCard />
    </MainLayout>
  )
};

export default Wallet;
