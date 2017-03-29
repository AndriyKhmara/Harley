import React from "react";
import {FormControl, Button} from "react-bootstrap";

export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleProcessSignUpForm = this.handleProcessSignUpForm.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);



        this.state = {
            showModal: false,
            errors: {},
            successMessage: "",
            secretData: "",
            user: {
                username: "",
                password: ""
            }
        };
    }

    handleProcessSignUpForm(event) {
        event.preventDefault();
        const name = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${name}&password=${password}`;
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/signup");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });
                this.setState({
                    successMessage: "You are successfully registered, please login to access your profile"
                });
                localStorage.setItem("successMessage", xhr.response.alert);
                if (xhr.response.alert) {
                    this.setState({
                        errors: xhr.response.alert
                    });
                }
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors: xhr.response.message
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

        return (
            <div className="col-sm-12">
                <form action="/"
                      onSubmit={this.handleProcessSignUpForm}
                >
                    {this.state.successMessage &&
                    <p className="error-message">{this.state.successMessage}</p>}
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
                    <div>
                        <Button className="btn btn-primary"
                                type="submit"
                        >
                            Create New Account
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

RegisterComponent.propTypes = {
};