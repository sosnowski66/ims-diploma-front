import { userConstants } from "../_constants";

let token = JSON.parse(localStorage.getItem("token"));
const initialState = token ? { loggedIn: true, token } : {};


export function authentication(state = initialState, action) {
    console.log("ASDASDASd", action.user)

    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                token: action.token
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
