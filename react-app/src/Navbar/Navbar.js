import styles from './Navbar.module.css'

const Navbar = () => {
  return (
      <div className={styles.navbar}>
          <nav className={styles.upperblock}>
              <div className={styles.label}>ARMAGEDDON V</div>
              <div className={styles.links}>
                  <a className={styles.home} href="/">Астероиды</a>
                  <a className={styles.cart} href="/cart">Уничтожение</a>
              </div>
          </nav>
          <div className={styles.lowerblock}>
              Сервис мониторинга и уничтожения астероидов,
              <br></br>
              опасно подлетающих к Земле.
          </div>
      </div>
  );
}
 
export default Navbar;