import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useNextDraw } from '../queries/dashboardQueries';
import styles from '../styles/Dashboard.module.scss';

dayjs.extend(duration);

export const CountdownTimer: React.FC = () => {
  const { data: nextDraw } = useNextDraw();
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  useEffect(() => {
    if (!nextDraw?.cutoffDatetime) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const cutoff = dayjs(nextDraw.cutoffDatetime);
      const diff = cutoff.diff(now);

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
      } else {
        setTimeLeft(dayjs.duration(diff).format('HH:mm:ss'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextDraw]);

  return (
    <div className={styles.countdownTimer}>
      <span className={styles.timerValue}>{timeLeft}</span>
    </div>
  );
};
