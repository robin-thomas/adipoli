import Link from 'next/link'
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import CryptoJS from 'crypto-js';

import MainLayout from '../components/MainLayout';
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

  const onSubmit = async ({ fullName, email, password }, setStatus) => {
    setStatus(null);

    const salt = CryptoJS.lib.WordArray.random(32).toString();
    const hash = CryptoJS.SHA3(`${password}${salt}`).toString();

    const body = { fullName, email, hash, salt };

    try {
      // Create the user.
      await fetchJson('/api/register', { method: 'POST', body });
    } catch (err) {
      return setStatus(err.data.error ?? 'Failed to create an account! Please try again.');
    }

    try {
      // Create the session.
      await mutateUser(
        fetchJson('/api/session/login', { method: 'POST', body })
      );
    } catch (err) {
      console.log('error', err.data);
      return setStatus('Failed to create a session! Please try again.');
    }
  }

  return (
    <MainLayout title="Register">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              fullName: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(100).required('Email is required'),
                fullName: Yup.string().max(100).required('Full name is required'),
                password: Yup.string().max(32).required('Password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
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
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Register
                  </Typography>
                </Box>
                {!!status && <Alert severity="error">{status}</Alert>}
                <Box sx={{ pb: 1, pt: 1 }} />
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Full name"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                  disabled={isSubmitting}
                />
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
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the Terms and Conditions
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link href="/login">Login</Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Register;
