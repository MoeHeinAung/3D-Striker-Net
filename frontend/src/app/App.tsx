import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme, App as AntApp } from 'antd';
import { Navbar } from '../components/Navbar.js';
import { DashboardPage } from '../pages/Dashboard.js';
import { DrawsPage } from '../pages/Draws.js';
import { NetworkPage } from '../pages/Network.js';
import { OperationsPage } from '../pages/Operations.js';
import { RiskPage } from '../pages/Risk.js';
import { ReportPage } from '../pages/Report.js';
import { SettingsPage } from '../pages/Settings.js';
import { useUIStore } from '../store/uiStore.js';
import styles from '../styles/Layout.module.scss';

const { Content } = Layout;

function App() {
  const { theme: appTheme } = useUIStore();

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00daf3',
          colorBgBase: '#0d1516',
          colorBgContainer: '#192122',
          colorTextBase: '#dce4e5',
          borderRadius: 0,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 0,
            colorPrimary: '#00daf3',
          },
          Table: {
            colorBgContainer: 'transparent',
            colorText: '#dce4e5',
            colorTextHeading: '#dce4e5',
          }
        }
      }}
    >
      <AntApp>
        <Router>
          <Layout className={styles.layout}>
            <Navbar />
            <Content className={styles.content}>
              <Routes>
                <Route path="/" element={<div className={styles.bentoItem}><DashboardPage /></div>} />
                <Route path="/draws" element={<div className={styles.bentoItem}><DrawsPage /></div>} />
                <Route path="/network" element={<div className={styles.bentoItem}><NetworkPage /></div>} />
                <Route path="/sale" element={<div className={styles.bentoItem}><OperationsPage /></div>} />
                <Route path="/risk" element={<div className={styles.bentoItem}><RiskPage /></div>} />
                <Route path="/report" element={<div className={styles.bentoItem}><ReportPage /></div>} />
                <Route path="/settings" element={<div className={styles.bentoItem}><SettingsPage /></div>} />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
