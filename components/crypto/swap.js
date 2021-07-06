import { useState, useContext, useEffect } from 'react';
import { Box, Skeleton, TextField } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import SelectCrypto from './select';
import CryptoButton from './button';
import CryptoRate from './rate';
import Message from '../page/message';
import { DataContext } from '../utils/DataProvider';
import fetchJson from '../../utils/fetchJson';

import tokens from '../../config/tokens.json';

import styles from './buy.module.css';

const getInitial = (amount = 0, buyAmount = 0) => ({
  amount,
  buyAmount,
  token: Object.keys(tokens)[0],
  buyToken: Object.keys(tokens)[1],
});

const getSchema = (min = 0, max = 0) =>
  Yup.object().shape({
    amount: Yup.number().min(min).max(max).required('Amount is required'),
  });

const BuySell = ({
  name,
  amount,
  token,
  touched,
  error,
  disabled,
  handleBlur,
  handleChange,
  isSubmitting,
}) => (
  <TextField
    error={Boolean(touched && error)}
    helperText={touched && error}
    name={name}
    onBlur={handleBlur}
    onChange={handleChange}
    variant="standard"
    margin="normal"
    value={amount}
    disabled={disabled || isSubmitting}
    InputLabelProps={{ shrink: true }}
    inputProps={{
      style: {
        fontSize: 30,
        textAlign: 'right',
        fontFamily: 'Raleway',
      },
    }}
    InputProps={{
      startAdornment: token.toUpperCase(),
    }}
  />
);

const Swap = () => {
  const [price, setPrice] = useState('');
  const [initial, setInitial] = useState(getInitial());
  const [schema, setSchema] = useState(getSchema());

  const ctx = useContext(DataContext);

  const priceCal = (tokenId) => {
    let _price = parseFloat(ctx.prices[tokenId]);
    _price -= 0.01 * _price; // Add a spread of 3%;
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
      const sellToken = Object.keys(tokens)[0];
      const sellTokenId = tokens[sellToken].id;
      const buyToken = Object.keys(tokens)[1];
      const buyTokenId = tokens[buyToken].id;
      const sellAmount = 0.99 * parseFloat(ctx.prices[sellTokenId]);
      const _price = parseFloat(
        (sellAmount / ctx.prices[buyTokenId]).toFixed(5)
      );

      const max = limitSet(sellTokenId, sellToken);
      setInitial(getInitial(max));
      setPrice(_price);
    }
  }, [ctx.prices, ctx.balances]);

  const priceSet = (sellToken, sellAmount, buyToken) => {
    const sellTokenId = tokens[sellToken].id;
    const amountToSell =
      sellAmount * 0.99 * parseFloat(ctx.prices[sellTokenId]);

    const buyTokenId = tokens[buyToken].id;
    return parseFloat((amountToSell / ctx.prices[buyTokenId]).toFixed(5));
  };

  const onSellAmountChange = (e, values, setValues) => {
    const amount = e.target.value;

    const data = {
      amount,
      buyAmount: priceSet(values.token, amount, values.buyToken),
    };

    setValues({ ...values, ...data });
  };

  const onSelectChange = (e, values, setValues) => {
    const sellToken = e.target.value;

    if (sellToken !== values.token) {
      const buyToken = Object.keys(tokens).filter(
        (token) => token !== sellToken
      )[0];
      const sellTokenId = tokens[sellToken].id;

      const amount = limitSet(sellTokenId, sellToken);
      const data = {
        token: sellToken,
        amount,
        buyAmount: priceSet(sellToken, amount, buyToken),
        buyToken,
      };

      const buyTokenId = tokens[buyToken].id;
      const sellAmount =
        data.amount * 0.99 * parseFloat(ctx.prices[sellTokenId]);
      const _price = parseFloat(
        (sellAmount / ctx.prices[buyTokenId]).toFixed(5)
      );

      setValues(data);
      setPrice(_price);
    }
  };

  const onBuySelectChange = (e, values, setValues) => {
    const buyToken = e.target.value;

    if (buyToken !== values.buyToken) {
      values.buyToken = buyToken;
      values.buyAmount = priceSet(values.token, values.amount, buyToken);

      const sellTokenId = tokens[values.token].id;
      const buyTokenId = tokens[values.buyToken].id;
      const sellAmount =
        values.amount * 0.99 * parseFloat(ctx.prices[sellTokenId]);
      const _price = parseFloat(
        (sellAmount / ctx.prices[buyTokenId]).toFixed(5)
      );

      setValues(values);
      setPrice(_price);
    }
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    try {
      await fetchJson(`/api/crypto/${ctx.user.walletId}/sell`, {
        method: 'POST',
        body: {
          walletId: ctx.user.walletId,
          tokenId: values.token,
          amount: values.amount,
          price: parseFloat(ctx.prices[tokens[values.token].id]),
          prices: ctx.prices,
        },
      });
      await fetchJson(`/api/crypto/${ctx.user.walletId}/buy`, {
        method: 'POST',
        body: {
          walletId: ctx.user.walletId,
          tokenId: values.buyToken,
          amount: values.buyAmount,
          price: parseFloat(ctx.prices[tokens[values.buyToken].id]),
          prices: ctx.prices,
        },
      });
      setStatus({
        success: true,
        message: `Sold ${
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
                {Object.keys(ctx.prices).length === 0 ? (
                  <Skeleton variant="text" animation="wave" />
                ) : (
                  <BuySell
                    name="amount"
                    amount={values.amount}
                    token={values.token}
                    touched={touched.amount}
                    error={errors.amount}
                    handleBlur={handleBlur}
                    handleChange={(e) =>
                      onSellAmountChange(e, values, setValues)
                    }
                    isSubmitting={isSubmitting}
                  />
                )}
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
                  <BuySell
                    name="buyAmount"
                    amount={values.buyAmount}
                    token={values.buyToken}
                    touched={touched.buyAmount}
                    error={errors.buyAmount}
                    handleBlur={handleBlur}
                    disabled={true}
                  />
                )}
              </Box>
            </Col>
          </Row>
          <Box sx={{ mt: 1, mb: 4 }}>
            <p className={styles.para}>
              Amount shall be deposited to your wallet balance.
            </p>
          </Box>
          <Row>
            <Col>
              <SelectCrypto
                name="token"
                token={values.token}
                balances={ctx.balances}
                isSubmitting={isSubmitting}
                handleChange={(e) => onSelectChange(e, values, setValues)}
              />
            </Col>
            <Col md="auto" className="align-self-center text-center px-0">
              <DoubleArrowIcon fontSize="large" />
            </Col>
            <Col>
              <SelectCrypto
                name="buyToken"
                token={values.buyToken}
                isSubmitting={isSubmitting}
                disabledToken={values.token}
                handleChange={(e) => onBuySelectChange(e, values, setValues)}
              />
            </Col>
          </Row>
          <CryptoRate
            prices={ctx.prices}
            rate={`1 ${values.token.toUpperCase()} = ${price} ${values.buyToken.toUpperCase()}`}
          />
          <CryptoButton
            title="Swap"
            isSubmitting={isSubmitting}
            values={values}
          />
        </form>
      )}
    </Formik>
  );
};

export default Swap;
