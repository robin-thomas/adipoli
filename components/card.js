import Link from 'next/link'

import styles from './card.module.css';

const Card = ({ title, description, href }) => (
  <Link href={href}>
    <a className={styles.card}>
      <h3>{title} &rarr;</h3>
      <p>{description}</p>
    </a>
  </Link>
)

export default Card;
