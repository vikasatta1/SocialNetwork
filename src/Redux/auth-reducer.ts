import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
export type authAT = setUserDataAT
type setUserDataAT = {
    type: "SET_USER_DATA",
    data: {
        userId: number | null,
        email: string,
        login: string,
        isAuth: boolean
    }

}
const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}
type initAuthStateType = typeof initialState

const authReducer = (state = initialState , action: AppActionsType): initAuthStateType => {
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
        default: {
            return state;
        }
    }
}

export const setAuthUserData = (userId: number | null, email: string, login: string, isAuth: boolean): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        userId, email, login,isAuth
    }
})

export const getAuthUserDataThunkCreator = ( ) => (dispatch:Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
               dispatch(setAuthUserData(id, email, login, true));
            }
        });
}

export const loginThunkCreator = (email:string,password:string, rememberMe:boolean ) => (dispatch:Dispatch) => {
    authAPI.login(email,password,rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                // @ts-ignore
                dispatch(getAuthUserDataThunkCreator())
            } else {
               let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error:messages}))
            }
        });
}
export const logoutThunkCreator = ( ) => (dispatch:Dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                // @ts-ignore
                dispatch(getAuthUserDataThunkCreator(null,null,null,false))
            }
        });
}



export default authReducer;