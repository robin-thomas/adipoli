import Payment from 'payment';
import { TextField } from '@material-ui/core';

const CVV = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
}) => {
  const onChange = (e) => {
    const value = e.target.value.replace(/\D+/g, '');

    let maxLength = 4;
    if (values.number) {
      const issuer = Payment.fns.cardType(values.number);
      maxLength = issuer === 'amex' ? 4 : 3;
    }

    e.target.value = value.slice(0, maxLength);

    handleChange(e);
  };

  return (
    <TextField
      error={Boolean(touched.cvv && errors.cvv)}
      fullWidth
      helperText={touched.cvv && errors.cvv}
      label="Cvv"
      margin="normal"
      name="cvv"
      onBlur={handleBlur}
      onChange={onChange}
      type="text"
      value={values.cvv}
      variant="standard"
      disabled={isSubmitting}
      inputProps={{
        style: { color: 'white' },
      }}
      InputProps={{
        style: { fontSize: 25, fontFamily: 'Raleway' },
      }}
    />
  );
};

export default CVV;
