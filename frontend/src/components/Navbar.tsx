import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';

const { Header } = Layout;

export const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/', label: <Link to="/">Dashboard</Link> },
    { key: '/draws', label: <Link to="/draws">Draws</Link> },
    { key: '/network', label: <Link to="/network">Network</Link> },
    { key: '/sale', label: <Link to="/sale">Sale</Link> },
    { key: '/risk', label: <Link to="/risk">Risk</Link> },
    { key: '/report', label: <Link to="/report">Report</Link> },
    { key: '/settings', label: <Link to="/settings">Settings</Link> },
  ];

  return (
    <Header className={styles.navbar}>
      <div className={styles.logo}>3D-STRIKER-NET</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className={styles.menu}
      />
    </Header>
  );
};
