import React from "react";
import {AppActionsType} from "./reduxe-store";


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
    id: null,
    email: null,
    login: null ,
    isAuth: false
}

const authReducer = (state = initialState , action: AppActionsType) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
    }
}

export const setAuthUserData = (id: number, email: string, login: string,isAuth:boolean): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        id, email, login,isAuth
    }
})

export default authReducer;