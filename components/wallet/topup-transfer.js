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
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@material-ui/core';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

import TopUp from './topup';
import Transfer from './transfer';

import styles from './topup-transfer.module.css';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <>{children}</>}
  </div>
);

const TopUpTransfer = ({ name, walletId }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <Container className={styles.container}>
      <Tabs value={value} onChange={handleChange}>
        <Tooltip title="Topup your wallet">
          <Tab label="Top Up" />
        </Tooltip>
        <Tooltip title="Transfer your wallet funds to another">
          <Tab label="Transfer" />
        </Tooltip>
      </Tabs>
      <Box p={3} />
      <TabPanel value={value} index={0}>
        <TopUp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Transfer />
      </TabPanel>
    </Container>
  );
};

export default TopUpTransfer;
