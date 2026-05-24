import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { Navbar } from '../components/Navbar.js';
import { DashboardPage } from '../pages/Dashboard.js';
import { DrawsPage } from '../pages/Draws.js';
import { SalesPage } from '../pages/Sales.js';
import { NetworkPage } from '../pages/Network.js';
import { RiskPage } from '../pages/Risk.js';
import { ReportPage } from '../pages/Report.js';
import { SettingsPage } from '../pages/Settings.js';
import { useUIStore } from '../store/uiStore.js';
import layoutStyles from '../styles/layout.module.scss';

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
          <div className={layoutStyles.viewportContainer}>
            <Navbar />
            <main className={layoutStyles.mainContent}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/draws" element={<DrawsPage />} />
                <Route path="/partners" element={<NetworkPage />} />
                <Route path="/sale" element={<SalesPage />} />
                <Route path="/risk" element={<RiskPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
