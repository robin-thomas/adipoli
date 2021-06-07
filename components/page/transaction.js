import { Tooltip } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { fromUnixTime, format } from 'date-fns';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';

import styles from './transaction.module.css';

const getTransactionType = (type) => {
  switch (type) {
    case 'p2p_transfer':
      return 'Transfer;';

    case 'payment_funds_in':
      return 'Top Up';

    default:
      return type.replace(/_/g, ' ');
  }
};

const getTransactionIcon = (type) => {
  switch (type) {
    case 'p2p_transfer':
      return <PersonOutlinedIcon fontSize="large" />;

    case 'payment_funds_in':
      return <GetAppIcon fontSize="large" />;
  }
};

const Transaction = ({ id, type, amount, created_at }) => (
  <div className={styles.txnContainer}>
    <Row className="align-items-center">
      <Col md="auto">
        <div className={styles.iconContainer}>{getTransactionIcon(type)}</div>
      </Col>
      <Col md="2">{getTransactionType(type)}</Col>
      <Tooltip title={id} placement="top" arrow>
        <Col md="4" className={styles.id}>
          ID {id.slice(0, 20)}...
        </Col>
      </Tooltip>
      <Col md="2" className={styles.amount}>
        <span className={styles[`${amount > 0 ? 'amountGreen' : 'amountRed'}`]}>
          {amount > 0 ? `+$${amount}` : `-$${Math.abs(amount)}`}
        </span>
      </Col>
      <Col md="auto" className="ml-auto mr-4">
        <div className={styles.date}>
          <Row>
            <Col>{format(fromUnixTime(created_at), 'yyyy-MM-dd')}</Col>
          </Row>
          <Row>
            <Col>{format(fromUnixTime(created_at), 'hh:mm aaa')}</Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

export default Transaction;
