import Link from 'next/link';

import Card from '../components/card';
import Layout from '../components/layout';

import styles from './index.module.css';

const Index = () => (
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
          title="Wallet"
          description="P2P transfers. Virtual credit cards. Cryptocurrency deposits."
          href="/wallet"
        />
      </div>
    </div>
  </Layout>
);

export default Index;
