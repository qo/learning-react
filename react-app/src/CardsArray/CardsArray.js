import styles from './CardsArray.module.css'
import Card from '../Card/Card'
import { useContext } from "react";
import { Context } from '../Home/Home'

const CardsArray = () => {

    const context = useContext(Context);

    let asteroids = context.asteroids;
    let dangerousOnly = context.dangerousOnly;
    let units = context.units;

    // Если чекнут чекбокс dangerousOnly,
    // то оставляем только пропсы для опасных астероидов
    if (dangerousOnly)
        asteroids = asteroids.filter((asteroid)=>asteroid.isDangerous)

    let CardsComponents = [];
    asteroids.forEach(asteroid => CardsComponents.push(<Card asteroid={asteroid} units={units}/>));

    console.log(asteroids);
    console.log(dangerousOnly);
    console.log(units);

    return(
        <div>
            {CardsComponents}
        </div>
    );
}

export default CardsArray;