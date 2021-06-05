import Link from 'next/link';
import { Box } from '@material-ui/core';

import styles from './card.module.css';

const Card = ({ title, icon, href }) => (
  <Link href={href}>
    <a className={styles.card}>
      <Box
        sx={{
          display: 'flex',
          height: '15%',
          textAlign: 'center',
          justifyContent: 'center',
          padding: '10px 20px',
        }}
      >
        {icon}
      </Box>
      <h3>{title}</h3>
    </a>
  </Link>
);

export default Card;
