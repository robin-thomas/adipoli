import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SubjectIcon from '@material-ui/icons/Subject';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { Row, Col } from 'react-bootstrap';

import { DataContext } from '../utils/DataProvider';
import useUser from '../utils/useUser';
import fetchJson from '../../utils/fetchJson';

import styles from './sidebar.module.css';

const LogOut = () => {
  const ctx = useContext(DataContext);

  const { mutateUser } = useUser();

  const logout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        const resp = await fetchJson('/api/session/logout', { method: 'POST' });
        ctx.setUser(null);

        await mutateUser(resp);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.logout} onClick={logout}>
      <Tooltip title="Log out" placement="right" arrow>
        <IconButton color="inherit" component="span">
          <PowerSettingsNewIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const SidebarButton = ({ name, title, href, icon }) => {
  const SidebarIcon = icon;

  const ctx = useContext(DataContext);

  const onClick = () => ctx.setActive(name);

  return (
    <Row className="justify-content-center">
      <Col md="auto" onClick={onClick}>
        <Link href={href}>
          <Tooltip title={title} placement="right" arrow>
            {ctx.active === name ? (
              <Button
                variant="contained"
                color="secondary"
                style={{
                  borderRadius: 30,
                  padding: 10,
                  marginBottom: 20,
                }}
              >
                <SidebarIcon fontSize="large" color="white" />
              </Button>
            ) : (
              <Button className={styles.inActive}>
                <SidebarIcon fontSize="large" color="white" />
              </Button>
            )}
          </Tooltip>
        </Link>
      </Col>
    </Row>
  );
};

const SideBar = () => {
  const { user } = useUser();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(user && user?.isLoggedIn === true);
  }, [user]);

  if (!loggedIn) {
    return null;
  }

  const nav = {
    wallet: {
      name: 'wallet',
      title: 'Wallet',
      href: '/wallet',
      icon: AccountBalanceWalletIcon,
    },
    FlightInsurance: {
      name: 'flight-insurance',
      title: 'Flight Insurance',
      href: '/flight-insurance',
      icon: FlightTakeoffIcon,
    },
  };

  return (
    <div className={styles.container}>
      <Tooltip title={process.env.NEXT_PUBLIC_APP_NAME} placement="right" arrow>
        <div className={styles.logo}>{process.env.NEXT_PUBLIC_APP_NAME[0]}</div>
      </Tooltip>
      <Box sx={{ mb: 8 }} />
      {Object.keys(nav).map((title) => (
        <SidebarButton key={title} {...nav[title]} />
      ))}
      <LogOut />
    </div>
  );
};

export default SideBar;
