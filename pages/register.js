import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';

const Register = () => (
  <Container title="Adipoli | Register">
    <h1 className="title">
      Reg<span>ister</span>
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
      Already have an account?{' '}
      <Link href="/login">
        <a>Login</a>
      </Link>
    </p>
  </Container>
);

export default Register;
