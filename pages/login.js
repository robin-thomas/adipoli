import Link from 'next/link'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import MainLayout from '../components/MainLayout';
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

  const onSubmit = async ({ email, password }, setStatus) => {
    setStatus(null);

    const body = { email, password };

    try {
      await mutateUser(
        fetchJson('/api/session/login', { method: 'POST', body })
      );
    } catch (err) {
      setStatus('Incorrect username or password!');
    }
  }

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@robinthomas.io',
              password: 'password'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values, { setStatus }) => onSubmit(values, setStatus)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              status
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Log in
                  </Typography>
                </Box>
                {!!status && <Alert severity="error">{status}</Alert>}
                <Box sx={{ pb: 1, pt: 1 }} />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  disabled={isSubmitting}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  disabled={isSubmitting}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Log in
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?
                  {' '}
                  <Link href="/register">Sign up</Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </MainLayout>
  )
};

export default Login;
