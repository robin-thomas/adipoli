import Payment from 'payment';
import { TextField } from '@material-ui/core';

const Number = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
  setIssuer,
}) => {
  const onChange = (e) => {
    const issuer = Payment.fns.cardType(e.target.value);
    setIssuer(issuer);

    const v = e.target.value.replace(/\D+/g, '');

    let n;
    switch (issuer) {
      case 'amex':
        n = `${v.slice(0, 4)} ${v.slice(4, 10)} ${v.slice(10, 15)}`;
        break;
      case 'dinersclub':
        n = `${v.slice(0, 4)} ${v.slice(4, 10)} ${v.slice(10, 14)}`;
        break;
      default:
        n = `${v.slice(0, 4)} ${v.slice(4, 8)} `;
        n += `${v.slice(8, 12)} ${v.slice(12, 19)}`;
        break;
    }

    e.target.value = n.trim();

    handleChange(e);
  };

  return (
    <TextField
      error={Boolean(touched.number && errors.number)}
      fullWidth
      helperText={touched.number && errors.number}
      label="Number"
      margin="normal"
      name="number"
      type="tel"
      onBlur={handleBlur}
      onChange={onChange}
      value={values.number}
      variant="standard"
      disabled={isSubmitting}
      InputProps={{
        disableUnderline: true,
        style: { fontSize: 22, fontFamily: 'Raleway', color: 'white' },
      }}
    />
  );
};

export default Number;
