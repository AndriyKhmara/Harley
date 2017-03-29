import React from "react";
import { Button } from "react-bootstrap";
import Auth from "../modules/auth.jsx";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutUser = this.handleLogoutUser.bind(this);
        this.state = props;
    }

    handleLogoutUser() {
        Auth.deauthenticateUser();
        window.location.href = '/';
    }

    render () {
        return (
            <div className="container">
                {this.state.secretData &&
                <div>
                    <h2 style={{ fontSize: "16px", color: "green" }}>Hi {this.state.user}</h2>
                    <div>
                        {this.state.secretData}
                    </div>
                    <Button onClick={this.handleLogoutUser}
                        className="primary"
                    >
                        Log out
                    </Button>
                </div>
                }
            </div>
        );
    }
}