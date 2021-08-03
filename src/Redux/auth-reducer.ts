import React from "react";

const SET_USER_DATA = "SET_USER_DATA";
export type authAT = setUserDataAT
type setUserDataAT = {
    type: "SET_USER_DATA",
    data:{ userId: number,
        email: string,
        login: string}

}
const initialState = {
    userId: null,
    email: null,
    login: null,
};

const authReducer = (state: any = initialState, action: authAT) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
    }
}

export const setUserData = (userId: number, email: string, login: string): setUserDataAT => ({
    type: "SET_USER_DATA",
    data: {
        userId, email, login
    }})

export default authReducer;