import React from 'react';
import {Cookies} from "react-cookie";

type Credentials = Readonly<{
    login?: string,
    password?: string
}>

type LoginResponse = Readonly<{
    message?: string,
    success: boolean
}>

const cookies = new Cookies();
const cookieName = 'loggedIn';
export const auth = {
    loggedIn: () => cookies.get(cookieName) === 'true'
}

function checkCredentials(credentials: Credentials): boolean {
    return credentials.login === 'mitryp' && credentials.password === 'lab7';
}

function setLoginStatus(isLoggedIn: boolean) {
    cookies.set(cookieName, isLoggedIn);
}

export function processLogin(credentials: Credentials): LoginResponse {
    if (!checkCredentials(credentials)) {
        return {
            message: 'Please check your credentials',
            success: false
        };
    }

    setLoginStatus(true);
    return {
        success: true
    };
}

export function logout() {
    setLoginStatus(false);
}