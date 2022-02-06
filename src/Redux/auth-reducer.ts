import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


const authReducer = (state = initialState, action: authAT): initAuthStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                //...action.data,
                userId: action.data.userId,
                email: action.data.email,
                login: action.data.login,
                isAuth: action.data.isAuth
            }
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default: {
            return state;
        }
    }
}
//action
export const setAuthUserData = (userId: number | null, email: string, login: string, isAuth: boolean): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        userId, email, login, isAuth
    }
})
export const getCaptchaUrSuccessAC = (captchaUrl: string) => ({
    type: "GET_CAPTCHA_URL_SUCCESS", captchaUrl
} as const)
//thunk
export const getAuthUserDataThunkCreator = () => async (dispatch: Dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: Dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(getAuthUserDataThunkCreator())
    } else if (response.data.resultCode === 10) {
        // @ts-ignore
        dispatch(getCaptchaUrlTC())
    }else {
        let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: messages}))
    }
}
export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    let response = await securityAPI.getCaptchaURL()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrSuccessAC(captchaUrl))

}

export const logoutThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(setAuthUserData(null, null, null, false))
    }
}
//type
export type authAT = setUserDataAT
    | GetCaptchaUrlAT
type setUserDataAT = {
    type: "SET_USER_DATA",
    data: {
        userId: number | null,
        email: string,
        login: string,
        isAuth: boolean
    }
}
type initAuthStateType = typeof initialState
type GetCaptchaUrlAT = ReturnType<typeof getCaptchaUrSuccessAC>

export default authReducer;