import Link from 'next/link'

import Card from '../components/card';
import MainLayout from '../components/MainLayout';
import useUser from '../components/lib/useUser';

const Wallet = () => {
  const { user } = useUser({ redirectTo: '/login' })

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <MainLayout title="Adipoli | Wallet">
      <h1 className="title">
        Wall<span>et</span>
      </h1>
    </MainLayout>
  )
};

export default Wallet;
