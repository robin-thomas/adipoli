import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';
import LoginForm from '../components/loginform';

const Login = () => (
  <Container title="Adipoli | Login">
    <h1 className="title">
      Log<span>in</span>
    </h1>

    <LoginForm />

    <p className="description">
      Create an account instead?{' '}
      <Link href="/register">
        <a>Register</a>
      </Link>
    </p>
  </Container>
);

export default Login;
