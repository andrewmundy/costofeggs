import { Skeleton } from '@/components/ui/skeleton';
import styles from './styles/Home.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <Skeleton className="h-40 w-full mb-8" />

      <div className={styles.entriesGrid}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  );
}