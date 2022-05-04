import React from 'react'
import '../index.css'
import styles from './Home.module.css'
import CardsArray from "../CardsArray/CardsArray"
import { GetRequestURL, MakeAsteroidsList } from "../api_utils/nasaAPI";
import { useEffect, useReducer, createContext } from "react";
import ACTIONS from "../ACTIONS"
import MODES from "../MODES"

// Создаем контекст для доступа потомков к глобальным пропсам (определены в Home)
export const Context = createContext();

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.UPDATE_ASTEROIDS_LIST:
            return {
                ...state, asteroids: action.payload
            }
        case ACTIONS.SWITCH_DISTANCE_UNITS_MODE:
            return {
                ...state, units: action.payload
            };
        case ACTIONS.TOGGLE_DANGEROUS_ONLY_MODE:
            return {
                ...state, dangerousOnly: action.payload
            };
        case ACTIONS.ADD_ASTEROID_TO_CART:
            console.log("ACTION: ADD ASTEROID TO CART");
            return {
                ...state, cartAsteroids: action.payload
            };
        default:
            return new Error("Invalid Action");
    }
}

const Home = () => {

    /*
        Здесь определяем стейт приложения и хуки для него:
        dangerousOnly - показывать только опасные астероиды
        units - единицы измерения расстояния
        asteroids - данные об астероидах
     */

    /* const [dangerousOnly, setDangerousOnly] = React.useState(false);

        const toggleDangerousOnly = () => {
        setDangerousOnly(!dangerousOnly);
    };

    const [units, setUnits] = React.useState('km');

    const switchUnits = () => {
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

     */

    const [state, dispatch] = useReducer(reducer, {asteroids: [], cartAsteroids: [], dangerousOnly: false, units: 'km'});

    const toggleDangerousOnly = (e) => {
        dispatch({
            type: ACTIONS.TOGGLE_DANGEROUS_ONLY_MODE,
            payload: e.target.checked
        });
    }

    const switchUnits = () => {
        dispatch({
            type: ACTIONS.SWITCH_DISTANCE_UNITS_MODE,
            payload: (state.units === 'km') ? 'lunar' : 'km'
        });
    }

    useEffect(()=>{
        fetch(GetRequestURL())
            .then((response)=>response.json()
                .then((resData)=>{
                    dispatch({
                        type: ACTIONS.UPDATE_ASTEROIDS_LIST,
                        payload: MakeAsteroidsList(resData)});
                }))
    }, []);

    return (
    <div>
        <Context.Provider value={{state: state, dispatch: dispatch, mode: MODES.SEARCH_MODE}}>
            <div className={styles.input}>
                <div className={styles.checkbox}>
                    <Checkbox
                        label=" Только опасные"
                        value={state.dangerousOnly}
                        onChange={toggleDangerousOnly}
                    />
                </div>
                <div className={styles.distancechoice}>
                    <DistanceChoice choice={state.units} onClick={switchUnits}/>
                </div>
            </div>
            <div>
                <CardsArray />
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
