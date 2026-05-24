import layoutStyles from '../styles/layout.module.scss';
import { Card } from 'antd';

export const DashboardPage = () => (
  <div className={layoutStyles.pageContent}>
    <Card 
      title="Dashboard" 
      style={{ gridColumn: '1 / span 4', gridRow: '1 / span 2' }}
    >
      <p>System operational. All sensors nominal.</p>
    </Card>
    
    <Card 
      title="Recent Activity" 
      style={{ gridColumn: '5 / span 8', gridRow: '1 / span 4' }}
    >
      <p>No recent activity detected.</p>
    </Card>

    <Card 
      title="System Status" 
      style={{ gridColumn: '1 / span 4', gridRow: '3 / span 2' }}
    >
      <p>CPU: 12%</p>
      <p>Memory: 45%</p>
    </Card>
  </div>
);
