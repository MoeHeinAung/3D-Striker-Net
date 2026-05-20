import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';

export const Navbar = () => {
  const location = useLocation();

  const leftItems = [
    { key: '/', label: 'Overview' },
    { key: '/draws', label: 'Operations' },
    { key: '/network', label: 'Network' },
  ];

  const rightItems = [
    { key: '/sale', label: 'Sale' },
    { key: '/risk', label: 'Risk' },
    { key: '/report', label: 'Report' },
    { key: '/settings', label: 'System' },
  ];

  return (
    <header className={styles.navbar}>
      <nav className={styles.navSection}>
        {leftItems.map((item) => (
          <Link
            key={item.key}
            to={item.key}
            className={`${styles.navLink} ${location.pathname === item.key ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>3D-STRIKER-NET</h1>
      </div>

      <nav className={`${styles.navSection} ${styles.right}`}>
        {rightItems.map((item) => (
          <Link
            key={item.key}
            to={item.key}
            className={`${styles.navLink} ${location.pathname === item.key ? styles.active : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
