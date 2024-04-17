import React from "react";
import {ForecastEntry, WeatherApiDataEntry} from "./entries";
import {DailyForecast} from "../components/DailyForecast";
import * as _ from "lodash";

export class WeatherForecast {
    entries: ForecastEntry[][];

    constructor(data: WeatherApiDataEntry[]) {
        const forecastEntries = data.map(e => new ForecastEntry(e)),
            groups = _.groupBy(forecastEntries, (e) => e.date.getDate());

        this.entries = _.toArray(groups);
    }

    toDailyForecasts(): JSX.Element[] {
        return this.entries.map(
            (entries, i) => (
                <DailyForecast key={i} forecastEntries={entries}/>
            ));
    }
}