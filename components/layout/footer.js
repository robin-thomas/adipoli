import styles from './footer.module.css';

const Footer = () => (
  <div className={styles.footer}>
    <>
      <span className="ml-1 mr-1">&copy; 2021</span>
      <a
        href="https://github.com/robin-thomas/adipoli"
        target="_blank"
        rel="noopener noreferrer"
      >
        Robin Thomas
      </a>
    </>
    <div className="ml-auto mr-1">
      <span className="mr-1">Powered by</span>
      <a
        href="https://www.rapyd.net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rapyd
      </a>
    </div>
  </div>
);

export default Footer;
