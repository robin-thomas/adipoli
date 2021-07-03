import { Button, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckIcon from '@material-ui/icons/Check';
import { Row, Col } from 'react-bootstrap';

const getIcon = (icon) => {
  switch (icon) {
    case 'user':
      return <PersonIcon fontSize="large" />;

    case 'helicopter':
      return <FlightTakeoffIcon fontSize="large" />;

    case 'dollar-sign':
      return <AttachMoneyIcon fontSize="large" />;

    default:
    case 'check':
      return <CheckIcon fontSize="large" />;
  }
};

const ChooserBtn = ({ icon, desc, active }) => (
  <div>
    <div className="stepper-chooser-line" />
    <Tooltip title={desc} placement="top">
      <Button
        variant={!active ? 'outlined' : 'contained'}
        className="stepper-chooser-icon btn-rounded-icon"
        color="primary"
        style={{ cursor: 'default' }}
      >
        {getIcon(icon)}
      </Button>
    </Tooltip>
    <div className="stepper-chooser-line" />
  </div>
);

const StepperChooser = ({ index }) => {
  const icons = [
    {
      icon: 'user',
      desc: 'Fill in your travel details',
    },
    {
      icon: 'helicopter',
      desc: 'Choose your flight and policy',
    },
    {
      icon: 'dollar-sign',
      desc: 'Make your payment',
    },
    {
      icon: 'check',
      desc: 'Finish',
    },
  ];

  return (
    <div className="stepper-chooser">
      {icons.map((icon, i) => (
        <Row key={i} className="stepper-chooser-row">
          <Col>
            <ChooserBtn {...icon} active={i === index} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default StepperChooser;
