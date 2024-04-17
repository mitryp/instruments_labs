import React from 'react';
import '../css/LoginForm.css';
import {auth, processLogin} from "../auth/auth";
import {Navigate, NavigateFunction} from "react-router-dom";

class LoginForm extends React.Component<{ navigation: NavigateFunction }, { login?: string, password?: string, errorMsg?: string }> {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.FormField = this.FormField.bind(this);
    }

    render(): JSX.Element {
        const error = this.state.errorMsg;

        if (auth.loggedIn())
            return <Navigate to={'/dashboard'}/>;

        return (
            <form className="login_form" onSubmit={this.onSubmit}>
                <this.FormField type="text" placeholder="Your login" name="login"/>
                <this.FormField type="password" placeholder="Your password" name="password"/>
                <button type="submit">Log in</button>
                {!!error && <p className="error_message">{error}</p>}
            </form>
        );
    }

    FormField(props: Readonly<{ type: string, name: string, placeholder?: string }>): JSX.Element {
        return (
            <input value={this.state[props.name]} type={props.type} name={props.name} onChange={this.onChange}
                   placeholder={props.placeholder ?? ''}/>
        );
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            [event.target.name as string]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const res = processLogin(this.state);
        if (!res.success) {
            this.setState({errorMsg: res.message});
            return;
        }

        this.setState({errorMsg: undefined});
        this.props.navigation('/dashboard');
    }
}

export default LoginForm;