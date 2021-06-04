import { TextField } from '@material-ui/core';

const Name = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  isSubmitting,
}) => (
  <TextField
    error={Boolean(touched.name && errors.name)}
    helperText={touched.name && errors.name}
    label="Name"
    name="name"
    onBlur={handleBlur}
    onChange={handleChange}
    variant="standard"
    margin="normal"
    value={values.name}
    disabled={isSubmitting}
    inputProps={{
      style: { fontSize: 30, fontFamily: 'Raleway', color: 'white' },
    }}
    InputProps={{
      disableUnderline: true,
    }}
    InputLabelProps={{ shrink: true }}
  />
);

export default Name;
