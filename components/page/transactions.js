import { useEffect, useContext, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, Skeleton } from '@material-ui/core';

import { DataContext } from '../utils/DataProvider';
import Transaction from './transaction';
import ExportCSV from './exportCsv';

import styles from './transactions.module.css';

const Header = ({ transactions }) => (
  <Row>
    <Col className={styles.title}>Recent Transactions</Col>
    <Col md="auto" className="ml-auto">
      {transactions ? (
        <ExportCSV transactions={transactions} />
      ) : (
        <Skeleton animation="wave" variant="rect" width={150} height={48} />
      )}
    </Col>
  </Row>
);

const Transactions = ({ fetcher }) => {
  const [transactions, setTransactions] = useState(null);

  const ctx = useContext(DataContext);

  useEffect(() => {
    if (ctx.user?.walletId) {
      fetcher(ctx.user.walletId, setTransactions);
    }
  }, [ctx.user, ctx.toppedUp, setTransactions, fetcher]);

  const kids = [];
  for (let i = 0; i < 5; ++i) {
    kids.push(
      <div key={i}>
        <Box sx={{ mt: 5 }} />
        <Skeleton
          animation="wave"
          variant="rect"
          width={window.width}
          height={85}
        />
      </div>
    );
  }

  return (
    <>
      <Header transactions={transactions} />
      <hr className={styles.hr} />
      {!transactions ? (
        kids
      ) : transactions.length > 0 ? (
        <Scrollbars autoHide renderThumbHorizontal={() => <div></div>}>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} />
          ))}
        </Scrollbars>
      ) : (
        <span>There are no transactions.</span>
      )}
    </>
  );
};

export default Transactions;
