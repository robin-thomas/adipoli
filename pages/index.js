import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Card from '../components/card';
import Container from '../components/container';

export default () => (
  <Container title="Adipoli!">
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
  </Container>
);
