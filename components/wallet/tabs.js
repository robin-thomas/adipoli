import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormControlLabel, Switch, Tab, Tooltip } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import TopUp from './topup';
import Transfer from './transfer';
import PageTabs from '../page/tabs';

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

const Tabs = () => (
  <PageTabs panels={[<TopUp />, <Transfer />, <AutoDebit />]}>
    <Tooltip title="Topup your wallet">
      <Tab label="Top Up" />
    </Tooltip>
    <Tooltip title="Transfer your wallet funds to another">
      <Tab label="Transfer" />
    </Tooltip>
    <Tooltip title="Settings" className="ml-auto" arrow>
      <Tab label={<SettingsIcon />} />
    </Tooltip>
  </PageTabs>
);

export default Tabs;
