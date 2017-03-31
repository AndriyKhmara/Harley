import React from "react";
import { Button } from "react-bootstrap";
import Auth from "../modules/auth.jsx";
import { setProfileSettings, setChartColors } from "../actions/profileAction.jsx";
import _ from "lodash";


export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutUser = this.handleLogoutUser.bind(this);
        this.handleChangeChartColor1 = this.handleChangeChartColor1.bind(this);
        this.handleChangeChartColor2 = this.handleChangeChartColor2.bind(this);
        this.handleChangeChartColor3 = this.handleChangeChartColor3.bind(this);
        this.updateArray = this.updateArray.bind(this);
        this.state = props;
    }

    handleLogoutUser() {
        Auth.deauthenticateUser();
        window.location.href = "/";
    }
    //TODO: temporary code, this should be replaced like this - http://blog.scottlogic.com/2016/05/19/redux-reducer-arrays.html
    handleChangeChartColor1(event) {
        setProfileSettings(this.updateArray(this.state.profileSettings.chartColors, 0, event.target.value));
    }
    handleChangeChartColor2(event) {
        setProfileSettings(this.updateArray(this.state.profileSettings.chartColors, 1, event.target.value));
    }
    handleChangeChartColor3(event) {
        setProfileSettings(this.updateArray(this.state.profileSettings.chartColors, 2, event.target.value));
    }

    updateArray (array, index, newValue) {
        var newArray = [];
        for (var i= 0; i < array.length; i++) {
            if (i != index) {
                newArray.push(array[i])
            } else {
                newArray.push(newValue)
            }
        }
        return newArray;
    }

    render () {
        return (
            <div className="container-fluid">
                <div>
                    <h2 style={{ fontSize: "16px", color: "green" }}>Hello {this.state.profileSettings.username}</h2>
                    <p className="alert alert-info text-center">
                        You can adjust the interface of charts by selecting colors.
                    </p>
                    <div className="col-xs-12">
                        <label>Open Weather:</label>
                        <input
                            onChange={this.handleChangeChartColor1}
                            type="color"
                            value={this.state.profileSettings.chartColors[0]}
                        />
                    </div>
                    <br/>
                    <div className="col-xs-12">
                        <label>Wunderground:</label>
                        <input
                            onChange={this.handleChangeChartColor2}
                            type="color"
                            value={this.state.profileSettings.chartColors[1]}
                        />
                    </div>
                    <br/>
                    <div className="col-xs-12">
                        <label>Dark Sky:</label>
                        <input
                            onChange={this.handleChangeChartColor3}
                            type="color"
                            value={this.state.profileSettings.chartColors[2]}
                        />
                    </div>
                    <br/>
                    <Button
                        className="btn-danger"
                        onClick={this.handleLogoutUser}
                    >
                        Log out
                    </Button>
                </div>
            </div>
        );
    }
}