import { useContext, useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Snackbar,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import fetchJson from '../../utils/fetchJson';
import { DataContext } from '../utils/DataProvider';

const DollarAdornment = () => (
  <InputAdornment position="start">
    <span style={{ fontSize: 30, color: '#5664d2' }}>$</span>
  </InputAdornment>
);

const RequestModal = () => {
  const ctx = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onSnackClose = () => setSnackOpen(false);

  const onChange = (e, handleChange) => {
    e.target.value = e.target.value.replace(/\D+/g, '').slice(0, 3);
    handleChange(e);
  };

  const onSubmit = async (values, setStatus) => {
    setStatus(null);

    try {
      const walletId = ctx.user?.walletId;
      const url = `/api/wallet/request`;
      const resp = await fetchJson(url, {
        method: 'POST',
        body: {
          amount: parseInt(values.amount),
          walletId,
        },
      });

      await navigator.clipboard.writeText(resp.url);

      setOpen(false);
      setSnackOpen(true);
    } catch (err) {
      const message = err.data.error ?? 'Failed to generate payment link!';
      setStatus({ error: true, message });
    }
  };

  return (
    <>
      <Tooltip title="Generate payment link for others to pay" arrow>
        <Button variant="contained" onClick={onOpen}>
          Request Payment
        </Button>
      </Tooltip>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={onSnackClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={onSnackClose} severity="success">
          Payment url has been generated and copied to your clipboard!
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          amount: '999',
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.number().min(0).max(999).required('Amount is required'),
        })}
        onSubmit={(values, { setStatus }) => onSubmit(values, setStatus)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          status,
        }) => (
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Payment Link</DialogTitle>
            <DialogContent>
              {!!status && (
                <Box sx={{ mt: -4, mb: 2 }}>
                  <Alert severity={`${status.error ? 'error' : 'success'}`}>
                    {status.message.toUpperCase()}
                  </Alert>
                </Box>
              )}
              <DialogContentText>
                Create a payment link that can be shared with others, which on
                payment completion shall fund your wallet.
              </DialogContentText>
              <Row>
                <Col md="4">
                  <TextField
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                    label="Amount"
                    name="amount"
                    onBlur={handleBlur}
                    onChange={(e) => onChange(e, handleChange)}
                    variant="standard"
                    margin="normal"
                    value={values.amount}
                    disabled={isSubmitting}
                    InputLabelProps={{ shrink: true }}
                    // inputRef={(input) => input && input.focus()}
                    inputProps={{
                      style: {
                        fontSize: 45,
                        textAlign: 'right',
                        fontFamily: 'Raleway',
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: <DollarAdornment />,
                      endAdornment: (
                        <InputAdornment position="end">.00</InputAdornment>
                      ),
                    }}
                  />
                </Col>
              </Row>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

const Balance = () => {
  const ctx = useContext(DataContext);

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fn = async () => {
      try {
        const url = `/api/wallet/${ctx.user.walletId}`;
        const resp = await fetchJson(url, { method: 'GET' });

        setBalance(resp.balance);
      } catch (err) {
        // TODO.
      }
    };

    if (ctx.user?.walletId) {
      fn();
    }
  }, [ctx.user, ctx.toppedUp]);

  return (
    <Row>
      <Col md="auto">
        <Box sx={{ pt: 5, pb: 0 }}>
          <h1>${balance?.toLocaleString()}</h1>
          <p>
            Total balance in <b>USD</b>
          </p>
        </Box>
      </Col>
      <Col md="auto" className="ml-auto mr-4">
        <Box sx={{ mt: 2, pt: 5, pb: 0 }}>
          <RequestModal />
        </Box>
      </Col>
    </Row>
  );
};

export default Balance;
