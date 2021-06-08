import { InputAdornment, TextField } from '@material-ui/core';

import DollarAdornment from '../amount/dollarAdornment';

const Amount = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
  color,
}) => {
  const onChange = (e) => {
    e.target.value = e.target.value.replace(/\D+/g, '').slice(0, 3);
    handleChange(e);
  };

  return (
    <TextField
      error={Boolean(touched.amount && errors.amount)}
      helperText={touched.amount && errors.amount}
      label="Amount"
      name="amount"
      onBlur={handleBlur}
      onChange={onChange}
      variant="standard"
      margin="normal"
      value={values.amount}
      disabled={isSubmitting}
      InputLabelProps={{ shrink: true }}
      // inputRef={(input) => input && input.focus()}
      inputProps={{
        style: {
          fontSize: 40,
          textAlign: 'right',
          fontFamily: 'Raleway',
          color: color || 'white',
        },
      }}
      InputProps={{
        disableUnderline: true,
        startAdornment: <DollarAdornment />,
        endAdornment: <InputAdornment position="end">.00</InputAdornment>,
      }}
    />
  );
};

export default Amount;
