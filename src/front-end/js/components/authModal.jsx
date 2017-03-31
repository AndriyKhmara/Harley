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
            showModal: false
        }
    }

    render() {
        let close = () => this.setState({showModal: false});
        return (
            <div className="auth-wrapper">
                {
                    Auth.isUserAuthenticated() ?
                        (
                            <button
                                className="btn btn-info"
                                onClick={() => this.setState({showModal: true})}
                            >
                                Profile
                            </button>
                        ) : (
                            <button
                                className="btn btn-info"
                                onClick={() => this.setState({showModal: true})}
                            >
                                Log In / Register
                            </button>
                        )
                }
                <Modal
                    aria-labelledby="contained-modal-title"
                    container={this}
                    onHide={close}
                    show={this.state.showModal}
                >
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
                                                    profileSettings={this.props.profileSettings}
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
    profileSettings: React.PropTypes.object,
    userPassword: React.PropTypes.string
};