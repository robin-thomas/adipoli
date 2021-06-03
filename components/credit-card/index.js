import { useState } from "react";
import Card from "react-credit-cards";
import { Formik } from 'formik';
import {
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

import "react-credit-cards/es/styles-compiled.css";

const CreditCard  = () => {
  const [form, setForm] = useState(null);

  const onNumberChange = (e, handleChange) => {
    e.target.value = formatCreditCardNumber(e.target.value)
    handleChange(e);
  }

  const onExpiryChange = (e, handleChange) => {
    e.target.value = formatExpirationDate(e.target.value);
    handleChange(e);
  }

  const onCVCChange = (e, handleChange) => {
    e.target.value = formatCVC(e.target.value);
    handleChange(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const _formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setFormData(_formData);
    form.reset();
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          number: '4111 1111 1111 1111',
          expiry: '11/11',
          name: 'Robin Thomas',
          cvc: '111'
        }}
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
          <form ref={setForm} onSubmit={handleSubmit}>
            <Card
              number={values.number}
              name={values.name}
              expiry={values.expiry}
              cvc={values.cvc}
            />
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
                  error={Boolean(touched.cvc && errors.cvc)}
                  fullWidth
                  helperText={touched.cvc && errors.cvc}
                  label="CVC"
                  margin="normal"
                  name="cvc"
                  onBlur={handleBlur}
                  onChange={(e) => onCVCChange(e, handleChange)}
                  type="text"
                  value={values.cvc}
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
