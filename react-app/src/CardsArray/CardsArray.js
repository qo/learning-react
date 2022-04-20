import styles from './CardsArray.module.css'
import Card from '../Card/Card'

const CardsArray = ({propsArray}) => {
    let CardsComponents = [];
    propsArray.forEach(props => CardsComponents.push(<Card props={props}/>));

    return(
        <div>
            {CardsComponents}
        </div>
    );
}

export default CardsArray;