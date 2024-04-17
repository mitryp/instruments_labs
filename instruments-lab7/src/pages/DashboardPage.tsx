import React from 'react';
import {RouteDeclaration} from "./routeDeclaration";
import FiveDayForecast from "../components/FiveDayForecast";
import {fetchWeatherForecast} from "../weather/weather";
import '../css/DashboardPage.css';
import {auth, logout} from "../auth/auth";
import {Navigate, useNavigate} from "react-router-dom";

export function DashboardPage(): JSX.Element {
    const navigate = useNavigate();

    function processLogout(e: any) {
        e.preventDefault();
        logout();
        navigate('/');
    }

    if (!auth.loggedIn())
        return <Navigate to={'/'}/>;

    return (
        <>
            <header>
                <h1>Weather React App</h1>
                <a href="#" className="logout" onClick={processLogout}>Log out</a>
            </header>
            <div className="container">
                <main className="content">
                    <h2 className="location">Kyiv, Ukraine</h2>
                    <FiveDayForecast forecast={fetchWeatherForecast()}/>
                </main>
            </div>
        </>
    );
}

function dashboardRoute(path: string): Readonly<RouteDeclaration> {
    return {
        path: path,
        element: <DashboardPage/>
    }
}

DashboardPage.route = dashboardRoute;