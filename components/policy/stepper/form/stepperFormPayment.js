import { useContext, useState, useEffect, useRef } from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import parseISO from 'date-fns/parseISO';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Spinner, OverlayTrigger, Popover } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import { getPremium } from '../../../../utils/api';
import { DataContext } from '../../../utils/DataProvider';
import StepperPayment from '../stepperPayment';

import Airports from '../../../../config/airports.json';

const StepperFormPayment = ({ setIndex, setNextDisabled }) => {
  const ctx = useContext(DataContext);
  const ref = useRef(null);

  // to be set after premium is calculated.
  const [eth, setEth] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const calcPolicy = async () => {
      const policyId =
        new Date().valueOf().toString() +
        Math.random().toString(10).substring(2, 10);
      console.log('Policy ID: ', policyId);

      const from = Airports[ctx.searchAirports.from].iata;
      const premium = await getPremium(policyId, from, ctx.flight.code);

      setEth(premium);
      setAmount(Math.ceil(premium * 100));

      const date = format(
        addDays(parseISO(ctx.flight.arrivalTime), 1),
        'yyyy-MM-dd'
      );

      const _policy = {
        policyId,
        owner: ctx.user.walletId,
        date,
        products: ctx.policyProducts,
        flight: {
          from,
          to: Airports[ctx.searchAirports.to].iata,
          code: ctx.flight.code,
          name: ctx.flight.name,
          departureTime: ctx.flight.departureTime,
          arrivalTime: ctx.flight.arrivalTime,
        },
        premium: {
          amount: amount,
        },
      };

      ctx.setPolicy(_policy);
    };

    calcPolicy();
  }, [ctx.policyProducts, ctx.setPolicy, ctx.flight, ctx.searchAirports]);

  return (
    <div>
      <h4>Payment</h4>
      <p style={{ fontSize: '13px' }}>
        * insurance premium is calculated based on the risk
      </p>
      {amount === 0 ? (
        <div>
          <p style={{ fontSize: '13px' }}>* Calculating insurance premium</p>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div ref={ref}>
          <p style={{ fontSize: '15px' }}>
            Insurance premium to be paid: <b>${amount}</b>&nbsp;
            <OverlayTrigger
              trigger="click"
              placement="right"
              container={ref.current}
              rootClose={true}
              overlay={
                <Popover id="popover-positioned-right">
                  <Popover.Title as="h4">
                    How do we calculate the insurance premium?
                  </Popover.Title>
                  <Popover.Content>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => ctx.setOpenAbout(true)}
                    >
                      Click me to see
                    </Button>
                  </Popover.Content>
                </Popover>
              }
            >
              <HelpOutlineIcon fontSize="large" style={{ cursor: 'pointer' }} />
            </OverlayTrigger>
          </p>
        </div>
      )}
      <StepperPayment
        eth={eth}
        amount={amount}
        cb={() => setIndex((index) => index + 1)}
      />
    </div>
  );
};

export default StepperFormPayment;
