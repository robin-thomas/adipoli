import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';

export default () => (
  <Container title="Adipoli | Login">
    <h1 className="title">
      Log<span>in</span>
    </h1>

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

    <p className="description">
      Create an account instead?{' '}
      <Link href="/register">
        <a>Register</a>
      </Link>
    </p>
  </Container>
);
