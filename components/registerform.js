import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import styles from './form.module.css';

const RegisterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    const val = e.target.value;
    setDisabled(!val || val === '');
    setEmail(val);
  }

  const _onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(email);
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }

  return (
    <Paper component="form" className={styles.root}>
      <IconButton className={styles.iconButton}>
        <AccountCircle />
      </IconButton>
      <InputBase className={styles.input} placeholder="Email"/>
      <Divider className={styles.divider} orientation="vertical" />
      <IconButton className={styles.iconButton}>
        <PhoneAndroidIcon />
      </IconButton>
      <InputBase className={styles.input} placeholder="Mobile"/>
      <IconButton disabled={disabled} type="submit" className={styles.iconButton} onClick={_onSubmit}>
        <Icon>send</Icon>
      </IconButton>
    </Paper>
  );
};

export default RegisterForm;
