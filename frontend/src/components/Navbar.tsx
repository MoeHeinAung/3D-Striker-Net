import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';
import typography from '../styles/typography.module.scss';

export const Navbar = () => {
  const location = useLocation();

  const leftItems = [
    { key: '/draws', label: 'Draws' },
    { key: '/partners', label: 'Partners' },
    { key: '/sale', label: 'Sales' },
  ];

  const rightItems = [
    { key: '/risk', label: 'Risk' },
    { key: '/report', label: 'Report' },
    { key: '/settings', label: 'Settings' },
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
        <Link to="/">
          <h1 className={`${typography.logo} ${styles.logo}`}>3D-STRIKER-NET</h1>
        </Link>
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
