import React from "react";
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup, Modal, Tabs, Tab} from "react-bootstrap";
import Auth from "./authModal.jsx";
import {CHART_TYPES} from "./../constants/constants.jsx";
import { changeChartTypeAction, changeCityAction, changeDateFromAction, changeDateToAction, changeStatTypeAction } from "./../actions/chartActions.jsx";
import { getStatisticsDataAction } from "./../actions/dataActions.jsx";

export default class SideNav extends React.Component {
    constructor(props) {
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
        this.state = props.chartState;

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
                            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Log In">
                                    <div className="col-sm-12">
                                        <h2><span className="fa fa-sign-in"></span> Login</h2>
                                        <form action="/login" method="post">
                                            <div className="form-group">
                                                <label>User name</label>
                                                <input type="text" className="form-control" name="username"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control" name="password"/>
                                            </div>
                                            <button type="submit" className="btn btn-warning btn-lg">
                                                Log In
                                            </button>
                                        </form>
                                    </div>
                                </Tab>
                                <Tab eventKey={2} title="Register">
                                    <div className="col-sm-12">
                                        <h2><span className="fa fa-sign-in"></span> Sign up</h2>
                                        <form action="/signup" method="post">
                                            <div className="form-group">
                                                <label>User name</label>
                                                <input type="text" className="form-control" name="username"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className="form-control" name="password"/>
                                            </div>
                                            <button type="submit" className="btn btn-warning btn-lg">
                                                Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </Tab>
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