import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
export type authAT = setUserDataAT
type setUserDataAT = {
    type: "SET_USER_DATA",
    data: {
        id: number,
        email: string,
        login: string,
        isAuth: boolean
    }

}
const initialState = {
    id: null as number | null,
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
                id: action.data.id,
                email: action.data.email,
                login: action.data.login,
                isAuth: action.data.isAuth
            }
        default: {
            return state;
        }
    }
}

export const setAuthUserData = (id: number, email: string, login: string, isAuth: boolean): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        id, email, login,isAuth
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
                dispatch(stopSubmit("login", {_error:"Common error"}))
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