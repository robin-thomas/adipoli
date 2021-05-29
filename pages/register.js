import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';
import RegisterForm from '../components/registerform';
import useUser from '../components/lib/useUser';
import fetchJson from '../utils/fetchJson';

const Register = () => {
  const { user, mutateUser } = useUser({
    redirectTo: '/wallet',
    redirectIfFound: true,
  });

  if (!user || user?.isLoggedIn) {
    return null;
  }

  const onSubmit = async (email) => {
    await mutateUser(
      fetchJson('/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    );
  }

  return (
    <Container title="Adipoli | Register">
      <h1 className="title">
        Reg<span>ister</span>
      </h1>

      <RegisterForm onSubmit={onSubmit}/>

      <p className="description">
        Already have an account?{' '}
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </Container>
  );
};

export default Register;
