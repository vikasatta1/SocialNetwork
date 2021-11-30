import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {getAuthUserDataThunkCreator} from "./auth-reducer";

type setInitializedSuccess = {
    type: "SET_INITIALIZED_SUCCESS"
    initialized: boolean
}
const initialState = {
    initialized: false
}
type AppStateType = typeof initialState
export type AppActionType = setInitializedSuccess


const appReducer = (state = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case "SET_INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state;
        }

    }

}

export const setInitializedSuccess = ( initialized: boolean):setInitializedSuccess => ({
    type: "SET_INITIALIZED_SUCCESS",
    initialized
})
export const initializeApp = (/*initialized:boolean*/) => (dispatch:Dispatch) => {
    // @ts-ignore
    let promise = dispatch(getAuthUserDataThunkCreator())
    Promise.all([promise]).then(()=>{


        // @ts-ignore
        dispatch(setInitializedSuccess(/*initialized*/));
    });

}


export default appReducer;