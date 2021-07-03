import StepperFormTravel from './form/stepperFormTravel';
import StepperFormFlight from './form/stepperFormFlight';
import StepperFormPayment from './form/stepperFormPayment';
import StepperFormComplete from './form/stepperFormComplete';

const getForm = (index, props) => {
  switch (index) {
    case 3:
      return <StepperFormComplete {...props} />;

    case 2:
      return <StepperFormPayment {...props} />;

    case 1:
      return <StepperFormFlight {...props} />;

    default:
    case 0:
      return <StepperFormTravel {...props} />;
  }
};

const StepperForm = ({ index, setIndex, setNextDisabled }) => {
  return getForm(index, { setIndex, setNextDisabled });
};

export default StepperForm;
