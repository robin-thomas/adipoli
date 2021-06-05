import styles from './root.module.css';

const Root = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Root;
