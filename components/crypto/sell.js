import { useState, useContext, useEffect } from 'react';
import { Box, Skeleton, TextField } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SelectCrypto from './select';
import CryptoButton from './button';
import CryptoRate from './rate';
import { DataContext } from '../utils/DataProvider';

import tokens from '../../tokens.json';

import styles from './buy.module.css';

const Sell = () => {
  const [price, setPrice] = useState('');

  const ctx = useContext(DataContext);

  const priceCal = (tokenId) => {
    const _price = parseFloat(ctx.prices[tokenId].usd);

    // Add a spread of 3%;
    setPrice(_price - 0.01 * _price);
  };

  useEffect(() => {
    if (Object.keys(ctx.prices).length > 0) {
      const tokenId = tokens[Object.keys(tokens)[0]].id;
      priceCal(tokenId);
    }
  }, [ctx.prices]);

  const onSelectChange = (e, handleChange) => {
    const tokenId = tokens[e.target.value].id;
    priceCal(tokenId);
    handleChange(e);
  };

  const onSubmit = async (values, setStatus) => {};

  return (
    <Formik
      initialValues={{
        amount: '1',
        token: Object.keys(tokens)[0],
      }}
      validationSchema={Yup.object().shape({
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
          <Row className="align-items-center">
            <Col md="5">
              <Box sx={{ mt: 3 }} className={styles.receive}>
                <TextField
                  error={Boolean(touched.amount && errors.amount)}
                  helperText={touched.amount && errors.amount}
                  name="amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="standard"
                  margin="normal"
                  value={values.amount}
                  disabled={isSubmitting}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    style: {
                      fontSize: 40,
                      textAlign: 'right',
                      fontFamily: 'Raleway',
                    },
                  }}
                  InputProps={{
                    startAdornment: values.token.toUpperCase(),
                  }}
                />
              </Box>
            </Col>
            <Col md="2" className="text-center">
              <Box sx={{ mt: 3 }} className={styles.receive}>
                =
              </Box>
            </Col>
            <Col md="5">
              <Box sx={{ mt: 3 }} className={styles.receive}>
                {Object.keys(ctx.prices).length === 0 ? (
                  <Skeleton variant="text" animation="wave" />
                ) : (
                  <>
                    {'$ '}
                    {(values.amount * price).toFixed(2)}
                  </>
                )}
              </Box>
            </Col>
          </Row>
          <Box sx={{ mt: 2, mb: 5 }}>
            <p className={styles.para}>
              Amount shall be deposited to your wallet balance.
            </p>
          </Box>
          <SelectCrypto
            values={values}
            isSubmitting={isSubmitting}
            handleChange={(e) => onSelectChange(e, handleChange)}
          />
          <CryptoRate
            prices={ctx.prices}
            rate={`1 ${values.token.toUpperCase()} = $${price.toLocaleString()}`}
          />
          <CryptoButton
            title="Sell"
            isSubmitting={isSubmitting}
            values={values}
          />
        </form>
      )}
    </Formik>
  );
};

export default Sell;
