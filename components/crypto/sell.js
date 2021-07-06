import { useState, useContext, useEffect } from 'react';
import { Box, Skeleton, TextField } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SelectCrypto from './select';
import CryptoButton from './button';
import CryptoRate from './rate';
import Message from '../page/message';
import { DataContext } from '../utils/DataProvider';
import fetchJson from '../../utils/fetchJson';

import tokens from '../../config/tokens.json';

import styles from './buy.module.css';

const getInitial = (amount = 0) => ({
  amount,
  token: Object.keys(tokens)[0],
});

const getSchema = (min = 0, max = 0) =>
  Yup.object().shape({
    amount: Yup.number().min(min).max(max).required('Amount is required'),
  });

const Sell = () => {
  const [price, setPrice] = useState('');
  const [initial, setInitial] = useState(getInitial());
  const [schema, setSchema] = useState(getSchema());

  const ctx = useContext(DataContext);

  const priceCal = (tokenId) => {
    const _price = 0.99 * parseFloat(ctx.prices[tokenId]);
    setPrice(_price);

    return _price;
  };

  const limitSet = (tokenId, token) => {
    const _price = priceCal(tokenId);
    const min = parseFloat((10 / _price).toFixed(5));
    const max = ctx.balances[token] || 0;
    setSchema(getSchema(min, max));

    return max;
  };

  useEffect(() => {
    if (Object.keys(ctx.prices).length > 0) {
      const token = Object.keys(tokens)[0];
      const tokenId = tokens[token].id;
      const max = limitSet(tokenId, token);
      setInitial(getInitial(max));
    }
  }, [ctx.prices, ctx.balances]);

  const onSelectChange = (e, values, setValues) => {
    const token = e.target.value;
    const tokenId = tokens[token].id;

    const max = limitSet(tokenId, token);
    values.amount =
      max <= 10 ** 6 ? parseFloat(max.toString().substr(0, 6)) : max;
    values.token = token;

    setValues(values);
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    const body = {
      walletId: ctx.user.walletId,
      tokenId: values.token,
      amount: values.amount,
      price: parseFloat(ctx.prices[tokens[values.token].id]),
      prices: ctx.prices,
    };

    try {
      await fetchJson(`/api/crypto/${ctx.user.walletId}/sell`, {
        method: 'POST',
        body,
      });
      setStatus({
        success: true,
        message: `Sold $${
          values.amount
        } ${values.token.toUpperCase()} successfully!`,
      });

      ctx.setToppedUp((p) => p + 1);
    } catch (err) {
      const message =
        err.data.error ?? `Failed to sell ${values.token.toUpperCase()}!`;
      setStatus({ error: true, message });
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial}
      validationSchema={schema}
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
        setValues,
      }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Message status={status} />
          <Row className="align-items-center">
            <Col md="5">
              <Box sx={{ mt: 0 }} className={styles.receive}>
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
                      fontSize: 30,
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
              <Box sx={{ mt: 0 }} className={styles.receive}>
                =
              </Box>
            </Col>
            <Col md="5">
              <Box sx={{ mt: 0 }} className={styles.receive}>
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
          <Box sx={{ mt: 1, mb: 4 }}>
            <p className={styles.para}>
              Amount shall be deposited to your wallet balance.
            </p>
          </Box>
          <SelectCrypto
            token={values.token}
            balances={ctx.balances}
            isSubmitting={isSubmitting}
            handleChange={(e) => onSelectChange(e, values, setValues)}
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
