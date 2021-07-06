import { Tab, Tooltip } from '@material-ui/core';

import TopUp from './topup';
import Transfer from './transfer';
import PageTabs from '../page/tabs';

const Tabs = () => (
  <PageTabs panels={[<TopUp />, <Transfer />]}>
    <Tooltip title="Topup your wallet">
      <Tab label="Top Up" />
    </Tooltip>
    <Tooltip title="Transfer your wallet funds to another">
      <Tab label="Transfer" />
    </Tooltip>
  </PageTabs>
);

export default Tabs;
