import Head from 'next/head';
import Image from 'next/image';

import styles from './container.module.css';

const Container = ({ title, children }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/images/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>

    <main>
      {children}
    </main>

    <footer>
      <a
        href="https://www.rapyd.net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <Image src="/images/rapyd.svg" alt="Rapyd Logo" height="19" width="75" />
      </a>
    </footer>
  </div>
);

export default Container;
