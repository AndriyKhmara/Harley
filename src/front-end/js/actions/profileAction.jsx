import { ACTION_TYPES } from "./../constants/constants.jsx";
import Auth from "../modules/auth.jsx";
import store from "./../stores/harleyStore.jsx";

export function getProfileSettings() {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/user/v01/profile");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `${Auth.getToken()}`);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            setChartColors(xhr.response.colors);
            setUserName(xhr.response.username);
        }
    });
    xhr.send();
}

export function setProfileSettings(colors) {
    setChartColors(colors);

    const xhr = new XMLHttpRequest();
    const settingsData = {colors: colors};
    xhr.open("post", "/user/v01/changeSettings");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", `${Auth.getToken()}`);
    xhr.responseType = "json";
    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
            // setChartColors(xhr.response.colors);
            // setUserName(xhr.response.username);
        }
    });
    xhr.send(settingsData);
}

export function setChartColors (data) {
    store.dispatch({
        type: ACTION_TYPES.GET_COLORS_FOR_CHART,
        chartColors: data
    });
}

function setUserName (data) {
    store.dispatch({
        type: ACTION_TYPES.SET_USER_NAME,
        username: data
    });
}