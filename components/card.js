import Link from 'next/link';
import { Box } from '@material-ui/core';

import styles from './card.module.css';

const Card = ({ title, icon, href }) => (
  <Link href={href}>
    <a className={styles.card}>
      <Box
        className={styles.box}
        sx={{
          display: 'flex',
          height: '15%',
          padding: '10px 20px',
        }}
      ></Box>
      <h3>{title}</h3>
    </a>
  </Link>
);

export default Card;
