import Link from 'next/link'

import Card from '../components/card';
import Container from '../components/container';
import LoginForm from '../components/loginform';
import useUser from '../components/lib/useUser';
import fetchJson from '../utils/fetchJson';

const Login = () => {
  const { user, mutateUser } = useUser({
    redirectTo: '/wallet',
    redirectIfFound: true,
  });

  if (!user || user?.isLoggedIn) {
    return null;
  }

  const onSubmit = async (email) => {
    await mutateUser(
      fetchJson('/api/session/login', { method: 'POST', body: { email } })
    );
  }

  return (
    <Container title="Adipoli | Login">
      <h1 className="title">
        Log<span>in</span>
      </h1>

      <LoginForm onSubmit={onSubmit}/>

      <p className="description">
        Create an account instead?{' '}
        <Link href="/register">
          <a>Register</a>
        </Link>
      </p>
    </Container>
  )
};

export default Login;
