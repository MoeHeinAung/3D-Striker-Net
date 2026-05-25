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

  const [hours, minutes, seconds] = timeLeft.split(':');

  return (
    <div className={styles.countdownTimer}>
      <div className={styles.timerContainer}>
        <div className={styles.timerLabel}>NEXT DRAW IN</div>
        <div className={styles.timerDisplay}>
          <div className={styles.timerSegment}>
            <span className={styles.timerValue}>{hours}</span>
            <span className={styles.timerUnit}>H</span>
          </div>
          <span className={styles.timerSeparator}>:</span>
          <div className={styles.timerSegment}>
            <span className={styles.timerValue}>{minutes}</span>
            <span className={styles.timerUnit}>M</span>
          </div>
          <span className={styles.timerSeparator}>:</span>
          <div className={styles.timerSegment}>
            <span className={styles.timerValue}>{seconds}</span>
            <span className={styles.timerUnit}>S</span>
          </div>
        </div>
      </div>
    </div>
  );
};
