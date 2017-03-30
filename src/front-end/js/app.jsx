import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header.jsx";
import Content from "./components/content.jsx";
import Footer from "./components/footer.jsx";
import { getWeatherData, getStatisticsDataAction, getLeafletData } from "./actions/dataActions.jsx";
import { getProfileSettings } from "./actions/profileAction.jsx";
import store from "./stores/harleyStore.jsx";

class Harley extends React.Component {
    constructor() {
        super();
        this.unsubscribe = store.subscribe(() => {
                this.setState(store.getState());
            }
        );
        this.state = store.getState();
        getWeatherData();
        getLeafletData();
        getProfileSettings();
        getStatisticsDataAction(this.state.chart.periodFrom, this.state.chart.periodTo, this.state.chart.cityName);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                <Header
                    chartState={this.state.chart}
                    profileSettings={this.state.profileSettings}
                />
                <Content
                    chartType={this.state.chart.chartType}
                    currentChart={this.state.currentChart}
                    leaflet={this.state.leaflet.leaflet}
                    profileSettings={this.state.profileSettings}
                    statistics={this.state.statistics.statistics}
                    weather={this.state.weather.weather}
                />
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<Harley/>, document.getElementById("app"));
Harley.propTypes = {
    weather: React.PropTypes.array,
    leaflet: React.PropTypes.object
};