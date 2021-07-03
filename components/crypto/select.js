import Image from 'next/image';
import { Select, MenuItem } from '@material-ui/core';
import { Row, Col, Container } from 'react-bootstrap';

import tokens from '../../config/tokens.json';

import styles from './buy.module.css';

const SelectItem = ({ token }) => (
  <Container className={styles.container}>
    <Row className="align-items-center">
      <Col md="2">
        <Image src={`/images/icons/${token}.svg`} width={48} height={48} />
      </Col>
      <Col md="8">
        <Row>
          <Col className={styles.title}>{tokens[token].name}</Col>
        </Row>
        <Row>
          <Col className={styles.desc}>{token}</Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

const SelectCrypto = ({ values, handleChange, isSubmitting }) => (
  <Select
    name="token"
    value={values.token}
    onChange={handleChange}
    disabled={isSubmitting}
    fullWidth
  >
    {Object.keys(tokens).map((token, index) => (
      <MenuItem key={token} value={token}>
        <SelectItem token={token} />
      </MenuItem>
    ))}
  </Select>
);

export default SelectCrypto;
