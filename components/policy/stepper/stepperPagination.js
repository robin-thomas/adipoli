import { Button } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';

const StepperBtn = ({ disabled, onClick, text, index }) => {
  return index !== 3 ? (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  ) : null;
};

const StepperPagination = ({ index, setIndex, nextDisabled }) => (
  <Row>
    <Col md="auto">
      <StepperBtn
        text="Previous"
        index={index}
        disabled={index === 0}
        onClick={() => setIndex(index - 1)}
      />
    </Col>
    <Col md="auto" className="ml-auto">
      <StepperBtn
        text="Next"
        index={index}
        disabled={nextDisabled || index === 2}
        onClick={() => setIndex(index + 1)}
      />
    </Col>
  </Row>
);

export default StepperPagination;
