import React from 'react'
import '../index.css'
import styles from './Home.module.css'
import CardsArray from "../CardsArray/CardsArray"
import { GetRequestURL, MakeAsteroidsList} from "../api_utils/nasaAPI";
import { useEffect } from "react";

// Создаем контекст для доступа потомков к глобальным пропсам (определены в Home)
export const Context = React.createContext();

const Home = () => {

    /*
        Здесь определяем стейт приложения и хуки для него:
        dangerousOnly - показывать только опасные астероиды
        units - единицы измерения расстояния
        asteroids - данные об астероидах
     */

    const [dangerousOnly, setDangerousOnly] = React.useState(false);

    const toggleDangerousOnly = () => {
        setDangerousOnly(!dangerousOnly);
    };

    const [units, setUnits] = React.useState('km');

    const switchUnits = () => {
        if (units === 'km')
            setUnits('lunar');
        if (units === 'lunar')
            setUnits('km');
        console.log("Units after change: " + units);
    }

    const [asteroids, setAsteroids] = React.useState([{
        name:"Loading",
        date:"Loading",
        size:0,
        distance:0,
        isDangerous:"Loading",
    }]);

    useEffect(()=>{
        fetch(GetRequestURL())
            .then((response)=>response.json()
                .then((resData)=>{
                    setAsteroids(MakeAsteroidsList(resData))
                }))
    }, [])

    console.log(asteroids);

    return (
    <div>
        <Context.Provider value={{asteroids, dangerousOnly, units}}>
            <div className={styles.input}>
                <div className={styles.checkbox}>
                    <Checkbox
                        label=" Только опасные"
                        value={dangerousOnly}
                        onChange={toggleDangerousOnly}
                    />
                </div>
                <div className={styles.distancechoice}>
                    <DistanceChoice choice={units} onClick={switchUnits}/>
                </div>
            </div>
            <div>
                <CardsArray /> };
            </div>
        </Context.Provider>
    </div>
    );
};

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
}

const DistanceChoice = ({ choice, onClick }) => {
    console.log("DistanceChoice: " + choice);
    if (choice === 'km')
        return(
            <div>
                <span>
                    Расстояние&nbsp;
                </span>
                <span className={styles.chosen}>
                    в километрах,&nbsp;
                </span>
                <button className={styles.notchosen} onClick={onClick}>
                    в дистанциях до луны
                </button>
            </div>
        )

    else if (choice === 'lunar')
        return(
            <div>
                <span>
                    Расстояние&nbsp;
                </span>
                <button className={styles.notchosen} onClick={onClick}>
                    в километрах,&nbsp;
                </button>
                <span className={styles.chosen}>
                    в дистанциях до луны
                </span>
            </div>
        )
}

export default Home;