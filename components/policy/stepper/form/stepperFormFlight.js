import { useEffect, useState, useContext } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Spinner } from 'react-bootstrap';

import StepperChoosePolicy from '../stepperChoosePolicy';
import StepperFormSelect from '../stepperFormSelect';

import { DataContext } from '../../../utils/DataProvider';
import { getFlightsByRoute } from '../../../../utils/api';

const StepperFormTravel = ({ setNextDisabled }) => {
  const ctx = useContext(DataContext);

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fn = async () => {
      // At this point we have the AITA codes of both airports & date.
      const from = ctx.airports[ctx.searchAirports.from].iata;
      const to = ctx.airports[ctx.searchAirports.to].iata;
      const date = format(ctx.searchAirports.date, 'yyyy-MM-dd');

      const results = await getFlightsByRoute(from, to, date);

      let flights = [];
      for (const result of results) {
        if (result.code && result.name && result.departureTime) {
          const departureTime = parseISO(result.departureTime);

          flights[result.code] = {
            code: result.code,
            name: result.name,
            departureTime: result.departureTime,
            arrivalTime: result.arrivalTime,
            displayName: `${result.name} (${result.code}), dep: ${format(
              departureTime,
              'hh:mm aaa'
            )}`,
          };
        }
      }

      setFlights(flights);
    };

    if (ctx.searchAirports?.from) {
      fn();
    }
  }, [ctx.searchAirports, ctx.airports]);

  useEffect(() => {
    if (
      ctx.flight.code &&
      ctx.flight.name &&
      ctx.flight.departureTime &&
      ctx.policyProducts.length > 0
    ) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [ctx.flight, ctx.policyProducts, setNextDisabled]);

  return (
    <div>
      <h4>Select your flight</h4>
      {!flights || Object.keys(flights).length === 0 ? (
        <div style={{ fontSize: '13px', marginBottom: '75px' }}>
          * loading flights based on your search criteria &nbsp;&nbsp;
          <Spinner animation="border" size="sm" role="status" />
        </div>
      ) : (
        <StepperFormSelect flights={flights} />
      )}
      <h4>Customize your policy</h4>
      <p style={{ fontSize: '13px' }}>* insure against one or more below</p>
      <StepperChoosePolicy />
    </div>
  );
};

export default StepperFormTravel;
