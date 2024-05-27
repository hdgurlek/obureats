import styles from "./page.module.css";
import RestaurantGrid from './components/RestaurantGrid';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <RestaurantGrid>
        </RestaurantGrid>
      </div>
    </main>
  );
}
