import React from 'react';
import LoginForm from "../components/LoginForm";
import {RouteDeclaration} from "./routeDeclaration";
import {useNavigate} from "react-router-dom";

export function LoginPage(): JSX.Element {
    const navigation = useNavigate();
    return (
        <>
            <h1 className="site_name">React Weather App</h1>
            <LoginForm navigation={navigation}/>
        </>
    );
}

function loginRoute(path: string): Readonly<RouteDeclaration> {
    return {
        path: path,
        element: <LoginPage/>
    }
}

LoginPage.route = loginRoute;