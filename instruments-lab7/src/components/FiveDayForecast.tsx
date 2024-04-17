import React from "react";
import {WeatherForecast} from "../weather/forecast";
import '../css/FiveDayForecast.css';

type ForecastProps = {
    key?: number,
    forecast: Promise<WeatherForecast>
}

type ForecastState = {
    forecast?: WeatherForecast
}

export default class FiveDayForecast extends React.Component<ForecastProps, ForecastState> {
    constructor(props: ForecastProps) {
        super(props);

        this.state = {
            forecast: undefined
        }
    }

    componentDidMount() {
        this.props.forecast.then((forecast) => this.setState({
            forecast: forecast
        }));
    }

    render() {
        return (
            <>
                <div className="forecast">
                    {this.state?.forecast?.toDailyForecasts() ?? <p>loading!</p>}
                </div>
            </>
        );
    }
}