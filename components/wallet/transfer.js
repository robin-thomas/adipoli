import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Box, InputAdornment, TextField } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

import styles from './transfer.module.css';

const DollarAdornment = () => (
  <InputAdornment position="start">
    <span style={{ fontSize: 30, color: '#5664d2' }}>$</span>
  </InputAdornment>
);

const Transfer = () => {
  const ctx = useContext(DataContext);

  const onChange = (e, handleChange) => {
    e.target.value = e.target.value.replace(/\D+/g, '').slice(0, 3);
    handleChange(e);
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    const body = {
      walletId: ctx.user.walletId,
      email: values.email,
      amount: values.amount,
    };

    try {
      const resp = await fetchJson('/api/transfer', { method: 'POST', body });
      setStatus({
        success: true,
        message: `Transferred $${values.amount} successfully!`,
      });

      ctx.setToppedUp((p) => p + 1);
    } catch (err) {
      const message = err.data.error ?? 'Failed to transfer!';
      setStatus({ error: true, message });
    }
  };

  return (
    <>
      <p className={styles.text}>
        You can transfer your wallet funds to another user using their email
        address.
      </p>
      <Formik
        initialValues={{
          email: '',
          amount: 999,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Email is required'),
          amount: Yup.number().min(0).max(999).required('Amount is required'),
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
          status,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            {!!status && (
              <Box sx={{ mt: -4, mb: 2 }}>
                <Alert severity={`${status.error ? 'error' : 'success'}`}>
                  {status.message.toUpperCase()}
                </Alert>
              </Box>
            )}
            <Row className={styles.card}>
              <Col md="5">
                <TextField
                  error={Boolean(touched.amount && errors.amount)}
                  helperText={touched.amount && errors.amount}
                  label="Amount"
                  name="amount"
                  onBlur={handleBlur}
                  onChange={(e) => onChange(e, handleChange)}
                  variant="standard"
                  margin="normal"
                  value={values.amount}
                  disabled={isSubmitting}
                  inputProps={{
                    style: {
                      fontSize: 50,
                      fontFamily: 'Raleway',
                      textAlign: 'right',
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: <DollarAdornment />,
                    endAdornment: (
                      <InputAdornment position="end">.00</InputAdornment>
                    ),
                  }}
                />
              </Col>
            </Row>
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              label="Email"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              value={values.email}
              disabled={isSubmitting}
              inputProps={{
                style: { fontSize: 23, fontFamily: 'Raleway' },
              }}
            />
            <Box
              sx={{
                mt: 3,
                py: 2,
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitting || !values.amount}
                size="large"
                type="submit"
                variant="contained"
                style={{
                  boxShadow: '0 0 3em rgb(0,0,0,0.1)',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                }}
              >
                Transfer {values.amount ? `$${values.amount}` : ''}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Transfer;
