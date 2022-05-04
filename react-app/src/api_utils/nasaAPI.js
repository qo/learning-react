export const GetRequestURL = () =>{
    // Получаем ключ из файла .env (если его нет, используем демо-ключ)
    let key = process.env.REACT_APP_NASA_APIKEY || "DEMO_KEY";

    const today = new Date();

    // Получаем даты в формате yyyy-mm-dd
    const startDate = today.getFullYear() + '-' + today.getMonth() + (today.getDate()-7);
    console.log("Start Date: " + startDate);
    const endDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    console.log("End Date: " + endDate);

    // Получаем запрос для метода fetch
    return "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=" + key;

}

const ParseAsteroidData = (data) => {

    return {
        name: data.name,
        date: data.close_approach_data[0].close_approach_date,
        size: data.estimated_diameter.meters.estimated_diameter_max,
        distance: data.close_approach_data[0].miss_distance.kilometers,
        isDangerous: data.is_potentially_hazardous_asteroid
    }

}

export const MakeAsteroidsList = (data) =>{

    let asteroids = [];

    // Нужные данные вложены следующим образом
    // JSON -> "near_earth_objects" -> "date" -> данные тут
    for (let date in data.near_earth_objects) {
        for (let asteroid in data.near_earth_objects[date]) {
            asteroids.push(ParseAsteroidData(data.near_earth_objects[date][asteroid]));
        }
    }

    return asteroids;
}
