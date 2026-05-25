import { NightingaleChart } from '../components/NightingaleChart.js';
import { CountdownTimer } from '../components/CountdownTimer.js';

export const DashboardPage = () => (
  <>
    <NightingaleChart drawId={1} />
    <CountdownTimer />
  </>
);
