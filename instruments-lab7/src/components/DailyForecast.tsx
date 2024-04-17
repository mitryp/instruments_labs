import React from 'react';
import {ForecastEntry} from '../weather/entries';
import * as _ from 'lodash';


type DailyForecastProps = {
    key?: number,
    forecastEntries: ForecastEntry[]
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function ForecastDayCard(props: {key?: number, entry : ForecastEntry}) {
    const date = props.entry.date;

    return (
        <div className="date_card">
            <h3 className="time">{date.getHours()}:{_.padStart(date.getMinutes().toString(), 2, '0')}</h3>
            <span className="temp">{props.entry.temp.toFixed(0)}°C</span>
            <img src={`https://openweathermap.org/img/wn/${props.entry.weather.icon}@2x.png`} alt={props.entry.weather.weather_desc}
                 className="icon"/>
            <span className="weather_name">{_.capitalize(props.entry.weather.weather_desc)}</span>
        </div>
    )
}

export function DailyForecast(props: Readonly<DailyForecastProps>): JSX.Element {
    const date = props.forecastEntries[0].date;

    return (
        <article className="day_forecast">
            <h2 className="day_header">{months[date.getMonth()]}, {date.getDate()}</h2>

            <div className="hours">
                {
                    props.forecastEntries.map((e, i) => <ForecastDayCard key={i} entry={e}/>)
                }
            </div>
        </article>
    );
}