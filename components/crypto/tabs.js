import { Tab, Tooltip } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import PageTabs from '../page/tabs';

const Tabs = () => (
  <PageTabs panels={[<></>, <></>, <></>, <></>]}>
    <Tooltip title="Buy crypticurrencies">
      <Tab label="Buy" />
    </Tooltip>
    <Tooltip title="Sell cryptocurrencies">
      <Tab label="Sell" />
    </Tooltip>
    <Tooltip title="Swag your cryptocurrencies">
      <Tab label="Swap" />
    </Tooltip>
    <Tooltip title="Settings" className="ml-auto" arrow>
      <Tab label={<SettingsIcon />} />
    </Tooltip>
  </PageTabs>
);

export default Tabs;
