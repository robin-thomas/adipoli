import { useState, useContext, useEffect } from 'react';
import { Box, Skeleton } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import SelectCrypto from './select';
import CryptoButton from './button';
import CryptoRate from './rate';
import Amount from '../credit-card/amount';
import Message from '../page/message';
import { DataContext } from '../utils/DataProvider';
import fetchJson from '../../utils/fetchJson';

import tokens from '../../tokens.json';

import styles from './buy.module.css';

const Buy = () => {
  const [price, setPrice] = useState('');

  const ctx = useContext(DataContext);

  useEffect(() => {
    if (Object.keys(ctx.prices).length > 0) {
      const tokenId = tokens[Object.keys(tokens)[0]].id;
      setPrice(parseFloat(ctx.prices[tokenId].usd));
    }
  }, [ctx.prices]);

  const onChange = (e, handleChange, values) => {
    const token = e.target.value;
    const tokenId = tokens[token].id;
    setPrice(parseFloat(ctx.prices[tokenId].usd));
    handleChange(e);
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    const body = {
      walletId: ctx.user.walletId,
      tokenId: values.token,
      amount: values.amount,
      price: parseFloat(ctx.prices[tokens[values.token].id].usd),
    };

    try {
      await fetchJson(`/api/crypto/${ctx.user.walletId}/buy`, {
        method: 'POST',
        body,
      });
      setStatus({
        success: true,
        message: `Bought $${
          values.amount
        } ${values.token.toUpperCase()} successfully!`,
      });

      ctx.setToppedUp((p) => p + 1);
    } catch (err) {
      const message =
        err.data.error ?? `Failed to buy ${values.token.toUpperCase()}!`;
      setStatus({ error: true, message });
    }
  };

  return (
    <Formik
      initialValues={{
        amount: '250',
        token: Object.keys(tokens)[0],
      }}
      validationSchema={Yup.object().shape({
        amount: Yup.number().min(10).max(999).required('Amount is required'),
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
          <Message status={status} />
          <Row className="align-items-center">
            <Col md="5">
              <Amount
                values={values}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                isSubmitting={isSubmitting}
                color="black"
              />
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
                    {values.token.toUpperCase()}{' '}
                    {(values.amount / price).toFixed(5)}
                  </>
                )}
              </Box>
            </Col>
          </Row>
          <Box sx={{ mt: 1, mb: 3 }}>
            <p className={styles.para}>
              Amount shall be taken from your wallet balance.
            </p>
          </Box>
          <SelectCrypto
            values={values}
            isSubmitting={isSubmitting}
            handleChange={(e) => onChange(e, handleChange, values)}
          />
          <CryptoRate
            prices={ctx.prices}
            rate={`1 ${values.token.toUpperCase()} = $${price.toLocaleString()}`}
          />
          <CryptoButton
            title="Buy"
            isSubmitting={isSubmitting}
            values={values}
          />
        </form>
      )}
    </Formik>
  );
};

export default Buy;
