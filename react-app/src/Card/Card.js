import largeasteroid from "../assets/largeasteroid.svg";
import mediumasteroid from "../assets/mediumasteroid.svg";
import smallasteroid from "../assets/smallasteroid.svg";
import styles from "../CardsArray/CardsArray.module.css";
import dino from "../assets/dino.svg";

const Card = ({props}) => {

    console.log("Card");
    console.log(props);

    function handleSubmit(e) {
        e.preventDefault();
        console.log('You clicked submit.');
    }

    let asteroidsrc;
    if (props.size > 500) asteroidsrc = largeasteroid;
    else if (props.size > 100) asteroidsrc = mediumasteroid;
    else asteroidsrc = smallasteroid;

    let cardstyle;
    if (props.isDangerous) cardstyle = styles.dangerousCard;
    else cardstyle = styles.harmlessCard;

    return (
        <div className={cardstyle}>
            <div className={styles.leftblock}>
                <img className={styles.asteroid} src={asteroidsrc}></img>
                <img className={styles.dino} src={dino}></img>
            </div>
            <div className={styles.centerblock}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.data}>
                    <div>Дата: {props.date}</div>
                    <div>Расстояние: {props.distance} км</div>
                    <div>Размер: {props.size} м</div>
                </div>
            </div>
            <div className={styles.rightblock}>
                <div>
                    <div>Оценка:</div>
                    {(props.isDangerous) ?
                        <div className={styles.grade}>опасен</div> :
                        <div className={styles.grade}>не опасен</div>}
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