import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Button, Select, MenuItem, Skeleton } from '@material-ui/core';
import { Row, Col, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Amount from '../credit-card/amount';
import fetchJson from '../../utils/fetchJson';

import tokens from '../../tokens.json';

import styles from './buy.module.css';

const SelectItem = ({ token }) => (
  <Container className={styles.container}>
    <Row className="align-items-center">
      <Col md="2">
        <Image src={`/images/icons/${token}.svg`} width={48} height={48} />
      </Col>
      <Col md="8">
        <Row>
          <Col className={styles.title}>{tokens[token].name}</Col>
        </Row>
        <Row>
          <Col className={styles.desc}>{token}</Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

const Buy = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await fetchJson('/api/crypto/prices');
        setPrices(resp.prices);
      } catch (err) {
        // TODO
      }
    };

    fn();
  }, []);

  const onSubmit = async (values, setStatus) => {};

  return (
    <Formik
      initialValues={{
        amount: '250',
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
          <Box width={1 / 3}>
            <Amount
              values={values}
              touched={touched}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              isSubmitting={isSubmitting}
              color="black"
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <p className={styles.para}>
              Amount shall be taken from your wallet balance
            </p>
          </Box>
          <Select
            name="token"
            value={values.token}
            onChange={handleChange}
            fullWidth
          >
            {Object.keys(tokens).map((token, index) => (
              <MenuItem key={token} value={token}>
                <SelectItem token={token} />
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ mt: 2, mb: 5 }}>
            {Object.keys(prices).length === 0 ? (
              <Skeleton variant="text" animation="wave" />
            ) : (
              <p>
                1 {values.token.toUpperCase()} = $
                {prices[tokens[values.token]?.id]?.usd?.toLocaleString()}
              </p>
            )}
          </Box>
          <Button
            color="primary"
            disabled={isSubmitting || !values.amount || values.amount === '0'}
            size="large"
            type="submit"
            variant="contained"
            fullWidth
            style={{ boxShadow: '0 0 3em rgb(0,0,0,0.1)' }}
          >
            Buy {tokens[values.token].name}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Buy;
