import React from "react";
import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";


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
type authStateType = {
    userId: null | number,
    email:null | string,
    login: null | string
};

type Api = {
    data: {
        id: number,
        login: string,
        email: string
    },
    messages: [],
    fieldsErrors: [],
    resultCode: number
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
                isAuth: true
            }
        default: {
            return state
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

export default authReducer;