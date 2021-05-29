import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '55px 0 15px 0',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '24px'
  },
  iconButton: {
    padding: 10,
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton}>
        <AccountCircle />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Email"

      />
      <IconButton type="submit" className={classes.iconButton}>
        <Icon>send</Icon>
      </IconButton>
    </Paper>
  );
};

export default LoginForm;
