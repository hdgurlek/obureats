import RestaurantGrid from "@/components/RestaurantGrid";
import styles from "./page.module.css";

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
