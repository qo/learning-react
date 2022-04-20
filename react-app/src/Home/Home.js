import React from 'react'
import '../index.css'
import styles from './Home.module.css'
import CardsArray from "../CardsArray/CardsArray"

const Home = () => {

    const [dangerousOnly, setDangerousOnly] = React.useState(false);

    const handleCheckboxChange = () => {
        setDangerousOnly(!dangerousOnly);
    };

    const [units, setUnits] = React.useState('km');

    const handleUnitsChange = () => {
        if (units === 'km')
            setUnits('moons');
        else
            setUnits('km');
    }

    const getPropsForAllAsteroids = () =>
        ([
            {
                name: "2021 FQ",
                date: "12 сентября 2021",
                distance: 7235024,
                size: 85,
                isDangerous: false,
            },
            {
                name: "2021 ER",
                date: "2 ноября 2021",
                distance: 9331775,
                size: 300,
                isDangerous: false,
            },
            {
                name: "2022 QQ",
                date: "3 марта 2022",
                distance: 2866012,
                size: 850,
                isDangerous: true,
            },
            {
                name: "2022 QW",
                date: "4 марта 2022",
                distance: 2866012,
                size: 850,
                isDangerous: true,
            },
        ]);

    const getPropsForDangerousAsteroids = () =>
        ([
            {
                name: "2022 QQ",
                date: "3 марта 2022",
                distance: 2866012,
                size: 850,
                isDangerous: true,
            },
            {
                name: "2022 QW",
                date: "4 марта 2022",
                distance: 2866012,
                size: 850,
                isDangerous: true,
            },
        ]);

    const propsForAllAsteroids = getPropsForAllAsteroids();
    const propsForDangerousAsteroids = getPropsForDangerousAsteroids();

    return (
        <div>
            <div className={styles.input}>
                <div className={styles.checkbox}>
                    <Checkbox
                        label=" Только опасные"
                        value={dangerousOnly}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <div className={styles.distancechoice}>
                    <DistanceChoice choice={'km'}/>
                </div>
            </div>
            <div>
                {dangerousOnly ?
                    <CardsArray propsArray={propsForDangerousAsteroids}/> :
                    <CardsArray propsArray={propsForAllAsteroids}/> }
            </div>
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

const DistanceChoice = ({ choice }) => {
    if (choice === 'km')
        return(
            <div>
                <span>
                    Расстояние&nbsp;
                </span>
                <span className={styles.chosen}>
                    в километрах,&nbsp;
                </span>
                <span className={styles.notchosen}>
                    в дистанциях до луны
                </span>
            </div>
        )

    else if (choice === 'moons')
        return(
            <div>
                <span>
                    Расстояние&nbsp;
                </span>
                <span className={styles.notchosen}>
                    в километрах,&nbsp;
                </span>
                <span className={styles.chosen}>
                    в дистанциях до луны
                </span>
            </div>
        )
}
 
export default Home;
