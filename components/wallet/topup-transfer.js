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
  FormControlLabel,
  InputAdornment,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

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

const AutoDebit = () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => setChecked((checked) => !checked);

  return (
    <>
      <Row className="align-items-center">
        <Col md="auto">
          <FormControlLabel
            value="end"
            control={<Switch checked={checked} onChange={onChange} />}
            label="Auto Debit"
            labelPlacement="end"
          />
        </Col>
        <Col md="auto">
          <Tooltip
            arrow
            title="If your wallet balance falls below $100, it shall be topped up automatically"
          >
            <HelpOutlineIcon fontSize="small" style={{ marginTop: -15 }} />
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

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
        <Tooltip title="Settings" className="ml-auto" arrow>
          <Button onClick={() => handleChange(null, 2)}>
            <SettingsIcon />
          </Button>
        </Tooltip>
      </Tabs>
      <Box p={3} />
      <TabPanel value={value} index={0}>
        <TopUp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Transfer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AutoDebit />
      </TabPanel>
    </Container>
  );
};

export default TopUpTransfer;
