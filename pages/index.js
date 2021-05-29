import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Card from '../components/card';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Adipoli!</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Adi<span>Poli!</span>
        </h1>

        <p className="description">
          Get started by creating an{' '}
          <Link href="/login">
            <a>account</a>
          </Link>.
        </p>

        <div className="grid">
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
  )
}
