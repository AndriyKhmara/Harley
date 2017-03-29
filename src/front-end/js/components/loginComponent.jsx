import React from "react";
import {FormControl, Button } from "react-bootstrap";
import Auth from "../modules/auth.jsx";

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleProcessForm = this.handleProcessForm.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);

        const storedMessage = localStorage.getItem("successMessage");
        let successMessage = "";

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem("successMessage");
        }

        this.state = {
            showModal: false,
            errors: {},
            successMessage,
            secretData: "",
            user: {
                username: "",
                password: ""
            }
        };
    }

    handleProcessForm(event) {
        event.preventDefault();
        const username = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${username}&password=${password}`;
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });
                if (xhr.response.alert) {
                    this.setState({
                        errors: xhr.response.alert
                    });
                } else {
                    Auth.authenticateUser(xhr.response);
                    window.location.href = '/';
                }
            }
            else {
                this.setState({
                    errors: xhr.response.alert
                });
            }
        });
        xhr.send(formData);
    }

    handleChangeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="col-sm-12">
                <form action="/"
                      onSubmit={this.handleProcessForm}
                >
                    <h2 className="card-heading">Login</h2>

                    {this.state.errors.incorrectUserName ?
                    <p className="success-message">{this.state.errors.incorrectUserName}</p> :
                        <p className="error-message">{this.state.errors.incorrectPassword}</p>
                    }
                    <div className="field-line">
                        <FormControl
                            name="username"
                            onChange={this.handleChangeUser}
                            type="text"
                            value={this.state.user.username}
                        />
                    </div>
                    <div className="field-line">
                        <FormControl
                            name="password"
                            onChange={this.handleChangeUser}
                            type="password"
                            value={this.state.user.password}
                        />
                    </div>

                    <div className="button-line">
                        <Button type="submit"
                            className="primary"
                        >
                            Log in
                        </Button>
                    </div>

                </form>

            </div>
        );
    }
}

LoginComponent.propTypes = {
};