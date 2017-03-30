import {ACTION_TYPES} from "./../constants/constants.jsx";

export function profileSettings (state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_COLORS_FOR_CHART:
            let newState = state;
            newState.chartColors = action.chartColors;
            return newState;
        case ACTION_TYPES.SET_USER_NAME:
            let userNameState = state;
            userNameState.username = action.username;
            return userNameState;
        default: return state;
    }
}