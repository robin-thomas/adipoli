import Link from 'next/link';
import Router from 'next/router';

import Card from '../components/card';
import Layout from '../components/layout';
import useUser from '../components/utils/useUser';

import styles from './index.module.css';

const Index = () => {
  const { user } = useUser();
  if (user?.isLoggedIn) {
    Router.push('/wallet');
    return null;
  }

  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <p className={styles.description}>
          Get started by creating an{' '}
          <Link href="/register">
            <a>account</a>
          </Link>
          .
        </p>

        <div className={styles.grid}>
          <Card
            title="Flight Insurance"
            description="No insurance claims. Eligible policies paid out automatically!"
            href="/flight-insurance"
          />
          <Card
            title="Cryptocurrency"
            description="Buy & sell cryptocurrencies. Portfolio tracker. Swap between cryptocurrencies."
            href="/crypto"
          />
          <Card
            title="Wallet"
            description="Credit-card topups. P2P transfers. Generate payment links."
            href="/wallet"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
