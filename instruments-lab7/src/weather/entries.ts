export interface WeatherApiDataEntry {
    clouds: { all: number };
    dt: number;
    dt_txt: string; // "2022-12-22 18:00:00"
    main: {
        feels_like: number; //1.05,
        grnd_level: number; //994,
        humidity: number //84,
        pressure: number, // 1013
        sea_level: number, // 1013
        temp: number, // 2.97
        temp_kf: number, // 2.77
        temp_max: number, // 2.97
        temp_min: number // 0.2
    }
    pop: number; // 0.16
    visibility: number; // 10000
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    }[];
    wind: { speed: number, deg: number, gust: number };
}

export class ForecastEntry {
    dateMs: number;
    dateStr: string;
    temp: number;
    pressure: number;
    weather: {
        name: string,
        weather_desc: string,
        icon: string
    };
    wind: {
        speed: number,
        deg: number
    }

    constructor(dataEntry: WeatherApiDataEntry) {
        this.dateMs = dataEntry.dt;
        this.dateStr = dataEntry.dt_txt;
        this.temp = dataEntry.main.temp;
        this.pressure = dataEntry.main.pressure;
        this.weather = {
            name: dataEntry.weather[0].main,
            weather_desc: dataEntry.weather[0].description,
            icon: dataEntry.weather[0].icon
        };
        this.wind = {
            speed: dataEntry.wind.speed,
            deg: dataEntry.wind.deg
        };
    }

    get date(): Date {
        return new Date(this.dateMs * 1000);
    }
}

// export function toForecastEntry(dataEntry: WeatherApiDataEntry): ForecastEntry {
//     return {
//         dateMs: dataEntry.dt,
//         dateStr: dataEntry.dt_txt,
//         temp: dataEntry.main.temp,
//         pressure: dataEntry.main.pressure,
//         weather: {
//             name: dataEntry.weather[0].main,
//             weather_desc: dataEntry.weather[0].description,
//             icon: dataEntry.weather[0].icon
//         },
//         wind: {
//             speed: dataEntry.wind.speed,
//             deg: dataEntry.wind.deg
//         }
//     };
// }