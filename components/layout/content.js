import styles from './content.module.css';

const Content = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Content;
