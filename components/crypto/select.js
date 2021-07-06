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

const SelectCrypto = ({
  name,
  token,
  disabledToken,
  handleChange,
  isSubmitting,
  balances,
}) => {
  const _tokens = Object.keys(tokens).filter((_token) => {
    if (balances && Object.keys(balances).length > 0) {
      return Object.keys(balances).includes(_token);
    }

    return true;
  });

  return (
    <Select
      name={name || 'token'}
      value={token}
      onChange={handleChange}
      disabled={isSubmitting}
      fullWidth
    >
      {_tokens.map((_token, index) => (
        <MenuItem
          key={_token}
          value={_token}
          disabled={disabledToken && disabledToken === _token}
        >
          <SelectItem token={_token} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectCrypto;
