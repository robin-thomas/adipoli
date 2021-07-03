import { useContext, useEffect } from 'react';

import StepperFormInput from '../stepperFormInput';
import ScheduleDate from '../../scheduleDate';
import { DataContext } from '../../../utils/DataProvider';

const StepperFormTravel = ({ setNextDisabled }) => {
  const ctx = useContext(DataContext);

  useEffect(() => {
    if (
      ctx.validAirports.from &&
      ctx.validAirports.to &&
      ctx.validAirports.date
    ) {
      setNextDisabled(false);
    } else {
      setNextDisabled(true);
    }
  }, [ctx.validAirports, setNextDisabled]);

  const set = (key, value, isValid) => {
    ctx.setSearchAirports((search) => ({ ...search, [key]: value }));
    ctx.setValidAirports((valid) => ({ ...valid, [key]: isValid }));
  };

  return (
    <div>
      <h4>Fill in your travel details</h4>
      <StepperFormInput
        keyName="from"
        label="From"
        state={ctx.searchAirports?.from || ''}
        set={(value, isValid) => set('from', value, isValid)}
      />
      <StepperFormInput
        keyName="to"
        label="To"
        state={ctx.searchAirports?.to || ''}
        set={(value, isValid) => set('to', value, isValid)}
      />
      <ScheduleDate
        keyName="date"
        label="Travel Date"
        date={ctx.searchAirports.date}
        setDate={(value) => set('date', value, true)}
      />
    </div>
  );
};

export default StepperFormTravel;
