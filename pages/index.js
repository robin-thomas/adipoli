import Link from 'next/link';

import Card from '../components/card';
import MainLayout from '../components/MainLayout';

import styles from './index.module.css';

const Index = () => (
  <MainLayout title="Home">
    <div class={styles.container}>
      <p className={styles.description}>
        Get started by creating an{' '}
        <Link href="/register">
          <a>account</a>
        </Link>.
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
  </MainLayout>
);

export default Index;
