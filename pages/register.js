import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';
import RegisterForm from '../components/registerform';

const Register = () => (
  <Container title="Adipoli | Register">
    <h1 className="title">
      Reg<span>ister</span>
    </h1>

    <RegisterForm/>

    <p className="description">
      Already have an account?{' '}
      <Link href="/login">
        <a>Login</a>
      </Link>
    </p>
  </Container>
);

export default Register;
