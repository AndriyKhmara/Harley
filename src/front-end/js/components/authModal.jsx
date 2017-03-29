import React from "react";
import {Modal, Button, FormControl, Tabs, Tab} from "react-bootstrap";
import UserProfile from "./profileComponent.jsx";
import Auth from "../modules/auth.jsx";
import LoginComponent from "./loginComponent.jsx";
import RegisterComponent from "./registerComponent.jsx";

export default class AuthModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            secretData: ""
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/profile");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", `${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message,
                    username: xhr.response.username
                });
            }
        });
        xhr.send();
    }


    render() {
        console.log(this.state);
        let close = () => this.setState({showModal: false});
        return (
            <div>
                <button
                    className="btn btn-info"
                    onClick={() => this.setState({showModal: true})}
                >
                    Log In / Register
                </button>
                <Modal
                    aria-labelledby="contained-modal-title"
                    container={this}
                    onHide={close}
                    show={this.state.showModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Log In / Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            Auth.isUserAuthenticated() ?
                                (
                                    <Tabs defaultActiveKey={1}
                                        id="profile-form"
                                    >
                                        <Tab eventKey={1}
                                             title="Profile"
                                        >
                                            <div className="col-sm-12">
                                                <UserProfile
                                                    secretData={this.state.secretData}
                                                    user={this.state.username}
                                                />
                                            </div>
                                        </Tab>
                                    </Tabs>) : (
                                <Tabs defaultActiveKey={1}
                                      id="login-form"
                                >
                                    <Tab eventKey={1}
                                         title="Log In"
                                    >
                                        <LoginComponent/>
                                    </Tab>
                                    <Tab eventKey={2}
                                         title="Register"
                                    >
                                        <RegisterComponent/>
                                    </Tab>
                                </Tabs>
                            )
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

AuthModal.propTypes = {
    userName: React.PropTypes.string,
    userPassword: React.PropTypes.string
};