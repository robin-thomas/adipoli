import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';

const Index = () => (
  <Container title="Adipoli!">
    <h1 className="title">
      Adi<span>Poli!</span>
    </h1>

    <p className="description">
      Get started by creating an{' '}
      <Link href="/register">
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

export default Index;
