import {ForecastEntry, WeatherApiDataEntry} from "./entries";
import {WeatherForecast} from "./forecast";

type Coordinates = {
    lat: number,
    lon: number
}

const coordinates: Coordinates = {
    lat: 50.4500336,
    lon: 30.5241361
}

const key = 'api-key';

export async function fetchWeatherForecast(): Promise<WeatherForecast> {
    return fetch(apiLink(key, coordinates))
        .then((res) => res.json())
        .then((json) => new WeatherForecast(json.list))
        .catch(() => null);
}

function apiLink(apiKey: string, coords: Coordinates): string {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
}