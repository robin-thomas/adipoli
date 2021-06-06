import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

import CreditCard from '../credit-card';

const TopUp = ({ name, walletId, amount }) => {
  const ctx = useContext(DataContext);

  return (
    <>
      <CreditCard name={name} walletId={walletId} amount={amount} />
    </>
  );
};

export default TopUp;
