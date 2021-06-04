import { useState } from "react";
import Card from "react-credit-cards";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
} from '@material-ui/core';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import WalletUtil from '../../utils/rapyd/wallet';

import "react-credit-cards/es/styles-compiled.css";

const CreditCard  = ({ name, walletId, amount }) => {
  const onNumberChange = (e, handleChange) => {
    e.target.value = formatCreditCardNumber(e.target.value)
    handleChange(e);
  }

  const onExpiryChange = (e, handleChange) => {
    e.target.value = formatExpirationDate(e.target.value);
    handleChange(e);
  }

  const onCVVChange = (e, handleChange) => {
    e.target.value = formatCVC(e.target.value);
    handleChange(e);
  }

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    const fields = {...values};
    fields.expiration_month = fields.expiry.split('/')[0];
    fields.expiration_year = fields.expiry.split('/')[1];
    delete fields.expiry;

    const data = {
      amount,
      walletId,
      card: {
        fields,
      },
    };

    try {
      await WalletUtil.topUp(data);
    } catch (err) {
      setStatus(err.data.error ?? 'Failed to topup wallet!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          number: '4111 1111 1111 1111',
          name: name || '',
          expiry: '11/11',
          cvv: '111'
        }}
        validationSchema={Yup.object().shape({
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
          status
        }) => (
          <form onSubmit={handleSubmit}>
            <Card
              number={values.number}
              name={values.name}
              expiry={values.expiry}
              cvc={values.cvv}
            />
            {!!status && <Alert severity="error">{status}</Alert>}
            <TextField
              error={Boolean(touched.number && errors.number)}
              fullWidth
              helperText={touched.number && errors.number}
              label="Number"
              margin="normal"
              name="number"
              type="tel"
              onBlur={handleBlur}
              onChange={(e) => onNumberChange(e, handleChange)}
              value={values.number}
              variant="outlined"
              disabled={isSubmitting}
            />
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.name}
              variant="outlined"
              disabled={isSubmitting}
            />
            <div className="row">
              <div className="col-6">
                <TextField
                  error={Boolean(touched.expiry && errors.expiry)}
                  fullWidth
                  helperText={touched.expiry && errors.expiry}
                  label="Expiry"
                  margin="normal"
                  name="expiry"
                  onBlur={handleBlur}
                  onChange={(e) => onExpiryChange(e, handleChange)}
                  type="text"
                  value={values.expiry}
                  variant="outlined"
                  disabled={isSubmitting}
                />
              </div>
              <div className="col-6">
                <TextField
                  error={Boolean(touched.cvv && errors.cvv)}
                  fullWidth
                  helperText={touched.cvv && errors.cvv}
                  label="CVV"
                  margin="normal"
                  name="cvv"
                  onBlur={handleBlur}
                  onChange={(e) => onCVVChange(e, handleChange)}
                  type="text"
                  value={values.cvv}
                  variant="outlined"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Pay
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default CreditCard;
