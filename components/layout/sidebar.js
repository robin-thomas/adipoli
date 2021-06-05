import { useContext, useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { DataContext } from '../utils/DataProvider';
import useUser from '../lib/useUser';
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

const SideBar = () => {
  const { user } = useUser();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(user && user?.isLoggedIn === true);
  }, [user]);

  if (!loggedIn) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>{process.env.NEXT_PUBLIC_APP_NAME}</div>
      <LogOut />
    </div>
  );
};

export default SideBar;
