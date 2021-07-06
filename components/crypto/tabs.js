import { Tab, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PageTabs from '../page/tabs';
import Buy from './buy';
import Sell from './sell';
import Swap from './swap';

const Tabs = ({ classes }) => (
  <PageTabs panels={[<Buy />, <Sell />, <Swap />]}>
    <Tooltip title="Buy crypticurrencies">
      <Tab classes={{ root: classes.tab }} label="Buy" />
    </Tooltip>
    <Tooltip title="Sell cryptocurrencies">
      <Tab classes={{ root: classes.tab }} label="Sell" />
    </Tooltip>
    <Tooltip title="Swag your cryptocurrencies">
      <Tab classes={{ root: classes.tab }} label="Swap" />
    </Tooltip>
  </PageTabs>
);

const styles = { tab: { minWidth: '140px !important' } };

export default withStyles(styles)(Tabs);
