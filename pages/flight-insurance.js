import { useContext } from 'react';
import { Box, Button } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

import Policy from '../components/policy/stepper';
import useUser from '../components/utils/useUser';
import Page from '../components/page';
import { DataContext } from '../components/utils/DataProvider';
import StepperFormPaymentAbout from '../components/policy/stepper/form/stepperFormPaymentAbout';

const FlightInsurance = () => {
  const { user } = useUser({ redirectTo: '/login' });

  const ctx = useContext(DataContext);

  if (!user || user.isLoggedIn === false) {
    return null;
  }

  return (
    <Page title="Flight Insurance" name="flight-insurance">
      <Box sx={{ mx: 10 }}>
        <Row>
          <Col xs="12" md="5" className="align-self-center">
            <h1>Flight Insurance</h1>
            <hr style={{ borderColor: 'black' }} />
            <Row>
              <Col md="9">
                <p>
                  Fill in your flight details. Customize your insurance policy.
                  Pay the insurance premium. That's it!
                </p>
              </Col>
            </Row>
            <Button
              variant="contained"
              color="primary"
              onClick={() => ctx.setOpenAbout(true)}
            >
              Learn More
            </Button>
          </Col>
          <Col xs="12" md="7">
            <Box sx={{ mt: 15 }}>
              <Policy />
            </Box>
          </Col>
        </Row>
      </Box>
      <StepperFormPaymentAbout />
    </Page>
  );
};

export default FlightInsurance;
