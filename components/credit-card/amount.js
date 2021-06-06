import { InputAdornment, TextField } from '@material-ui/core';

const DollarAdornment = () => (
  <InputAdornment position="start">
    <span style={{ fontSize: 30, color: '#5664d2' }}>$</span>
  </InputAdornment>
);

const Amount = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
}) => {
  const onChange = (e) => {
    e.target.value = e.target.value.replace(/\D+/g, '').slice(0, 4);
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
      inputProps={{
        style: {
          fontSize: 40,
          textAlign: 'right',
          fontFamily: 'Raleway',
          color: 'white',
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
