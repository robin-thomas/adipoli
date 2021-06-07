import { useEffect, useContext, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { DataContext } from '../utils/DataProvider';
import Transaction from './transaction';
import ExportCSV from './exportCsv';

import styles from './transactions.module.css';

const Transactions = ({ fetcher }) => {
  const [transactions, setTransactions] = useState([]);

  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx.user?.walletId) {
      fetcher(ctx.user.walletId, setTransactions);
    }
  }, [ctx.user, ctx.toppedUp, setTransactions]);

  return (
    <>
      <Row>
        <Col className={styles.title}>Recent Transactions</Col>
        <Col md="auto" className="ml-auto">
          <ExportCSV transactions={transactions} />
        </Col>
      </Row>
      <hr className={styles.hr} />
      <Scrollbars autoHide renderThumbHorizontal={() => <div></div>}>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} {...transaction} />
        ))}
      </Scrollbars>
    </>
  );
};

export default Transactions;
