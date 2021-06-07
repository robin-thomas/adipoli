import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { Alert, Box, Button } from '@material-ui/core';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

import Amount from './amount';
import Number from './number';
import Name from './name';
import Expiry from './expiry';
import CVV from './cvv';
import Issuer from './issuer';

import styles from './index.module.css';

const CreditCard = ({ name, walletId, amount }) => {
  const ctx = useContext(DataContext);

  const [issuer, setIssuer] = useState('visa');

  const getCardType = (issuer) => {
    switch (issuer) {
      case 'amex':
      case 'visa':
      case 'mastercard':
        return `us_${issuer}_card`;
    }
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    const { name, number, expiry, cvv } = values;
    const fields = { name, number, expiry, cvv };
    fields.number = fields.number.replace(/\s/g, '');
    fields.expiration_month = fields.expiry.split('/')[0];
    fields.expiration_year = fields.expiry.split('/')[1];
    delete fields.expiry;

    const type = getCardType(issuer);

    const body = {
      amount: parseInt(values.amount),
      walletId: ctx?.user?.walletId,
      card: {
        type,
        fields,
      },
    };

    try {
      await fetchJson('/api/wallet/topup', {
        method: 'POST',
        body,
      });
      setStatus({
        success: true,
        message: `Topped up $${values.amount} successfully!`,
      });

      ctx.setToppedUp((p) => p + 1);
    } catch (err) {
      const message = err.data.error ?? 'Failed to topup wallet!';
      setStatus({ error: true, message });
    }
  };

  return (
    <Formik
      initialValues={{
        amount: '999',
        number: '4111 1111 1111 1111',
        name: ctx?.user?.name || 'John Doe',
        expiry: '12/23',
        cvv: '111',
      }}
      validationSchema={Yup.object().shape({
        amount: Yup.number().min(0).max(999).required('Amount is required'),
        number: Yup.string().min(19).max(21).required('Number is required'),
        name: Yup.string().max(100).required('Name is required'),
        expiry: Yup.string().min(5).max(5).required('Expiry is required'),
        cvv: Yup.number().min(100).max(9999).required('CVV is required'),
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
      }) => {
        const props = {
          touched,
          errors,
          values,
          handleBlur,
          handleChange,
          isSubmitting,
        };

        return (
          <form onSubmit={handleSubmit} autoComplete="off">
            {!!status && (
              <Box sx={{ mt: -4, mb: 2 }}>
                <Alert severity={`${status.error ? 'error' : 'success'}`}>
                  {status.message.toUpperCase()}
                </Alert>
              </Box>
            )}
            <Row className={styles.card}>
              <Col md="6">
                <Box sx={{ mt: 0, mb: 2 }}>
                  <Issuer issuer={issuer} />
                </Box>
                <Row>
                  <Col md="9">
                    <Amount {...props} />
                  </Col>
                </Row>
                <Box>
                  <Name {...props} />
                </Box>
              </Col>
              <Col md="6">
                <Box sx={{ mt: -2, mb: 0 }}>
                  <Expiry {...props} />
                  <Number {...props} setIssuer={setIssuer} />
                  <CVV {...props} />
                </Box>
              </Col>
            </Row>
            <Box
              sx={{
                mt: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                color="primary"
                disabled={isSubmitting || !values.amount}
                size="large"
                type="submit"
                variant="contained"
                style={{ boxShadow: '0 0 3em rgb(0,0,0,0.1)' }}
              >
                Top Up {values.amount ? `$${values.amount}` : ''}
              </Button>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default CreditCard;
