import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import StepperForm from './stepperForm';
import StepperChooser from './stepperChooser';
import StepperPagination from './stepperPagination';

import styles from './index.module.css';

const Stepper = (props) => {
  const [index, setIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(true);

  return (
    <Container>
      <Row className={styles['stepper-form']}>
        <Col md="9" className="ml-auto">
          <Row style={{ height: '400px' }}>
            <Col>
              <StepperForm
                index={index}
                setIndex={setIndex}
                setNextDisabled={setNextDisabled}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <StepperPagination
                index={index}
                setIndex={setIndex}
                nextDisabled={nextDisabled}
              />
            </Col>
          </Row>
        </Col>
        <Col md="1">&nbsp;</Col>
        <Col md="auto" className="align-self-left">
          <StepperChooser index={index} />
        </Col>
      </Row>
    </Container>
  );
};

export default Stepper;
