import styles from "../CardsArray/CardsArray.module.css";
import dinoimg from "../assets/dino.svg";
import asteroidimg from "../assets/asteroid.svg";
import { useContext } from "react";
import { Context } from '../Home/Home'

const Card = (props) => {

    const context = useContext(Context);

    const units = context.units;

    let unitsAreKm;
    if (units === 'km')
        unitsAreKm = true;
    if (units === 'lunar')
        unitsAreKm = false;

    const { asteroid } = props;

    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
    }

    let cardstyle;
    if (asteroid.isDangerous) cardstyle = styles.dangerousCard;
    else cardstyle = styles.harmlessCard;

    return (
        <div className={cardstyle}>
            <div className={styles.leftblock}>
                <img className={styles.asteroid} src={asteroidimg}></img>
                <img className={styles.dino} src={dinoimg}></img>
            </div>
            <div className={styles.centerblock}>
                <div className={styles.name}>{asteroid.name}</div>
                <div className={styles.data}>
                    <div>Дата: {asteroid.date}</div>
                    {unitsAreKm ?
                        <div>Расстояние: {asteroid.distance} км</div> :
                        <div>Расстояние: {asteroid.distance / 384400} расстояний до луны</div>}
                    <div>Размер: {asteroid.size} м</div>
                </div>
            </div>
            <div className={styles.rightblock}>
                <div>
                    <div>Оценка:</div>
                    <div className={styles.grade}>{asteroid.isDangerous ? "опасен" : "не опасен"}</div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <button className={styles.submit} type="submit">На уничтожение</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Card;