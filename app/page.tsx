import RestaurantGrid from '@/components/home/RestaurantGrid'
import styles from '@/styles/page.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.center}>
				<RestaurantGrid />
			</div>
		</main>
	)
}
