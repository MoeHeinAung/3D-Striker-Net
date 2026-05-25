import { NightingaleChart } from '../components/NightingaleChart.js';
import { CountdownTimer } from '../components/CountdownTimer.js';
import { useDraws } from '../queries/useDraws.js';

export const DashboardPage = () => {
  const { data: drawsEnvelope } = useDraws();

  // Find the first open draw, or use the first available draw
  const activeDraw = drawsEnvelope?.data?.find(d => d.status === 'open') || drawsEnvelope?.data?.[0];

  return (
    <>
      <NightingaleChart drawId={activeDraw?.id ?? 0} />
      <CountdownTimer />
    </>
  );
};
