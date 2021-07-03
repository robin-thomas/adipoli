import { useContext, useState, useEffect } from 'react';

import { Box, Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Row, Col, Spinner } from 'react-bootstrap';

import PolicyPdf from '../../policyPdf';
import { getPolicy } from '../../../../utils/api';
import { DataContext } from '../../../utils/DataProvider';

const StepperFormComplete = ({ setIndex, setNextDisabled }) => {
  const [policy, setPolicy] = useState(null);

  const ctx = useContext(DataContext);

  const reset = () => {
    ctx.setValidAirports({
      from: false,
      to: false,
      date: false,
    });

    ctx.setSearchAirports({
      from: null,
      to: null,
      date: null,
    });

    ctx.setFlight({
      code: null,
      name: null,
      departureTime: null,
    });

    ctx.setPolicy(null);
    ctx.setPolicyProducts([]);

    setPolicy(null);
    setIndex(0);
  };

  useEffect(() => {
    const paymentCheck = async () => {
      // Once payment is completed, webook is triggered,
      // which creates a dummy owner policy,
      // existance of which verifies payment is done
      // (payment could fail though).

      const _policy = await getPolicy(ctx.policy.policyId);
      setPolicy(_policy);
    };

    paymentCheck();
  });

  return (
    <div>
      <Row>
        <Col className="text-center">
          {policy === null ? (
            <div>
              <h4>Waiting for payment confirmation</h4>
              <p style={{ fontSize: '13px' }}>* do not close the browser</p>
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <div>
              <h4>Payment has been confirmed</h4>
              <Box sx={{ mt: 2, mb: 5 }}>
                <CheckIcon fontSize="large" />
              </Box>
              <Row>
                <Col>
                  <PolicyPdf policy={policy} />
                </Col>
                <Col>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={reset}
                    title="Create another policy?"
                  >
                    Another?
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StepperFormComplete;
