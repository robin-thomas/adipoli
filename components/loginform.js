import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';

import styles from './form.module.css';

const LoginForm = () => (
  <Paper component="form" className={styles.root}>
    <IconButton className={styles.iconButton}>
      <AccountCircle />
    </IconButton>
    <InputBase className={styles.input} placeholder="Email"/>
    <IconButton type="submit" className={styles.iconButton}>
      <Icon>send</Icon>
    </IconButton>
  </Paper>
);

export default LoginForm;
