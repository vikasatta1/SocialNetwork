import React from "react";


export type authAT = setUserDataAT
type setUserDataAT = {
    type: "SET_USER_DATA",
    data: {
        id: number,
        email: string,
        login: string,
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

const authReducer = (state = initialState , action: authAT) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
    }
}

export const setAuthUserData = (id: number, email: string, login: string): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        id, email, login
    }
})

export default authReducer;