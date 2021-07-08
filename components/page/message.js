import { Alert, Box } from '@material-ui/core';

const Message = ({ status }) => {
  if (!!status) {
    return (
      <Box sx={{ mt: -2, mb: 2 }}>
        <Alert severity={`${status.error ? 'error' : 'success'}`}>
          {status.message.toUpperCase()}
        </Alert>
      </Box>
    );
  }

  return null;
};

export default Message;
