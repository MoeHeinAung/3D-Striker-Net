import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/Dashboard';
import { DrawsPage } from './pages/Draws';
import { NetworkPage } from './pages/Network';
import { SalePage } from './pages/Sale';
import { RiskPage } from './pages/Risk';
import { ReportPage } from './pages/Report';
import { SettingsPage } from './pages/Settings';
import styles from './styles/App.module.scss';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className={styles.layout}>
        <Navbar />
        <Content className={styles.content}>
          <Routes>
            <Route path="/" element={<div className={styles.bentoItem}><DashboardPage /></div>} />
            <Route path="/draws" element={<div className={styles.bentoItem}><DrawsPage /></div>} />
            <Route path="/network" element={<div className={styles.bentoItem}><NetworkPage /></div>} />
            <Route path="/sale" element={<div className={styles.bentoItem}><SalePage /></div>} />
            <Route path="/risk" element={<div className={styles.bentoItem}><RiskPage /></div>} />
            <Route path="/report" element={<div className={styles.bentoItem}><ReportPage /></div>} />
            <Route path="/settings" element={<div className={styles.bentoItem}><SettingsPage /></div>} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
