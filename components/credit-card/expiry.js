import { TextField } from '@material-ui/core';

const Expiry = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
}) => {
  const onChange = (e) => {
    const value = e.target.value.replace(/\D+/g, '');

    if (value.length >= 3) {
      e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else {
      e.target.value = value;
    }

    handleChange(e);
  };

  return (
    <TextField
      error={Boolean(touched.expiry && errors.expiry)}
      fullWidth
      helperText={touched.expiry && errors.expiry}
      label="Expiry"
      margin="normal"
      name="expiry"
      onBlur={handleBlur}
      onChange={onChange}
      type="text"
      value={values.expiry}
      variant="standard"
      disabled={isSubmitting}
      InputProps={{
        style: { fontSize: 25, fontFamily: 'Raleway', color: 'white' },
      }}
    />
  );
};

export default Expiry;
