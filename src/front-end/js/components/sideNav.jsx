import React from "react";
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup, Modal, Tabs, Tab} from "react-bootstrap";
import Auth from "../modules/auth.jsx";
import {CHART_TYPES} from "./../constants/constants.jsx";
import { changeChartTypeAction, changeCityAction, changeDateFromAction, changeDateToAction, changeStatTypeAction } from "./../actions/chartActions.jsx";
import { getStatisticsDataAction } from "./../actions/dataActions.jsx";
import UserProfile  from "./profileComponent.jsx";

export default class SideNav extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleShowChartClick = this.handleShowChartClick.bind(this);
        this.handleChartType = this.handleChartType.bind(this);
        this.handleSetInputData = this.handleSetInputData.bind(this);
        this._setRadioData = this._setRadioData.bind(this);
        this.handleSetDateFrom = this.handleSetDateFrom.bind(this);
        this.handleSetDateTo = this.handleSetDateTo.bind(this);
        this.handleGetFormData = this.handleGetFormData.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.processForm = this.processForm.bind(this);
        this.processSignUpForm = this.processSignUpForm.bind(this);
        this.checkLogined = this.checkLogined.bind(this);
        this.state = props.chartState;

        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            secretData: '',
            user: {
                username: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);

    }

    componentDidMount() {
        this.checkLogined();
    }

    checkLogined() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/profile');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message,
                    username: xhr.response.username
                });
            }
        });
        xhr.send();
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const username = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${username}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });
                if (xhr.response.alert) {
                    errors.summary = xhr.response.alert;
                    this.setState({
                        errors
                    });
                } else {
                    Auth.authenticateUser(xhr.response);
                }
            }
            //TODO: define, why no 404 from server
            else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.alert;
                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    processSignUpForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${name}&password=${password}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/signup');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });
                localStorage.setItem('successMessage', xhr.response.alert);
                if (xhr.response.alert) {

                    errors.summary = xhr.response.alert;
                    this.setState({
                        errors
                    });
                }
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }

    getInitialState() {
        return { showModal: false };
    }

    handleShowChartClick () {
        changeChartTypeAction(this.state.chartType);
    }

    handleChartType (type) {
        this.setState({
            chartType: type
        });
    }

    handleModalClose() {
        this.setState({ showModal: false });
    }

    handleModalOpen() {
        this.setState({ showModal: true });
    }

    handleSetInputData (event) {
        changeCityAction(event.target.value);
    }
    _setRadioData (event) {
        changeStatTypeAction(event.target.value);
    }

    handleSetDateFrom (value) {
        changeDateFromAction(value);
    }
    handleSetDateTo (value) {
        changeDateToAction(value);
    }

    handleGetFormData () {
        changeChartTypeAction(this.state.chartType);
        getStatisticsDataAction(this.state.periodFrom, this.state.periodTo, this.state.cityName);
    }



    render () {
        let close = () => this.setState({ showModal: false});
        return (
            <div className={this.props.className}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button
                        className="btn btn-info"
                        onClick={() => this.setState({ showModal: true})}
                    >
                        Log In / Register
                    </button>
                    <Modal
                        show={this.state.showModal}
                        onHide={close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Log In / Register
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Tabs defaultActiveKey={1} id="login-form">
                                <Tab eventKey={1} title="Log In">
                                    <div className="col-sm-12">
                                        <h2><span className="fa fa-sign-in"></span> Login</h2>
                                        <form action="/" onSubmit={this.processForm}>
                                            <h2 className="card-heading">Login</h2>

                                            {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
                                            {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

                                            <div className="field-line">
                                                <FormControl
                                                    name="username"
                                                    onChange={this.changeUser}
                                                    type="text"
                                                    value={this.state.user.username}
                                                />
                                            </div>

                                            <div className="field-line">
                                                <FormControl
                                                    type="password"
                                                    name="password"
                                                    onChange={this.changeUser}
                                                    value={this.state.user.password}
                                                />
                                            </div>

                                            <div className="button-line">
                                                <button type="submit">Log in</button>
                                            </div>

                                        </form>

                                    </div>
                                </Tab>
                                <Tab eventKey={2} title="Register">
                                    <div className="col-sm-12">
                                        <form action="/" onSubmit={this.processSignUpForm}>
                                            <h2 className="card-heading">Sign Up</h2>
                                            {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
                                            <div className="field-line">
                                                <FormControl
                                                    name="username"
                                                    onChange={this.changeUser}
                                                    type="text"
                                                    value={this.state.user.username}
                                                />
                                            </div>
                                            <div className="field-line">
                                                <FormControl
                                                    name="password"
                                                    onChange={this.changeUser}
                                                    type="password"
                                                    value={this.state.user.password}
                                                />
                                            </div>

                                            <div>
                                                <Button className="btn btn-primary" type="submit">Create New Account</Button>
                                            </div>
                                        </form>
                                    </div>
                                </Tab>
                                {
                                    Auth.isUserAuthenticated() ?
                                        (<Tab eventKey={3} title="Profile">
                                            <div className="col-sm-12">
                                                <UserProfile
                                                    secretData={this.state.secretData}
                                                    user={this.state.username}
                                                />
                                            </div>
                                        </Tab>) : (
                                        <Tab eventKey={4} title="test">
                                            <div className="top-bar-right">
                                                Unauthorized
                                            </div>
                                        </Tab>
                                    )
                                }
                            </Tabs>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <form>
                        <h3 className="">Show information</h3>
                        <FormGroup>
                            <ControlLabel>Select city:</ControlLabel>
                            <FormControl
                                componentClass="select"
                                onChange={this.handleSetInputData}
                                placeholder="select"
                            >
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Lutsk</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio
                                checked = {CHART_TYPES.TEMPERATURE === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.TEMPERATURE)}
                            >
                                Temperature
                            </Radio>
                            <Radio
                                checked = {CHART_TYPES.PRESSURE === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.PRESSURE)}
                            >
                                Pressure
                            </Radio>
                            <Radio
                                checked = {CHART_TYPES.WIND_SPEED === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.WIND_SPEED)}
                            >
                                Wind speed
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker
                                id = "example-datepicker-from"
                                onChange = {this.handleSetDateFrom}
                                value = {this.props.chartState.periodFrom}
                            />
                            <DatePicker
                                id = "example-datepicker-to"
                                onChange = {this.handleSetDateTo}
                                value = {this.props.chartState.periodTo}
                            />
                        </FormGroup>
                        <Button onClick={this.handleGetFormData}>
                            Show
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

SideNav.propTypes = {
    className: React.PropTypes.string,
    chartState: React.PropTypes.object,
    authError: React.PropTypes.object,
    userName: React.PropTypes.string,
    userPassword: React.PropTypes.string
};