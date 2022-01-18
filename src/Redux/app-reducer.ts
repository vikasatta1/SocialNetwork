import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {getAuthUserDataThunkCreator} from "./auth-reducer";

type setInitializedSuccess = {
    type: "SET_INITIALIZED_SUCCESS"
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

export const setInitializedSuccess = ():setInitializedSuccess => ({
    type: "SET_INITIALIZED_SUCCESS",
})
export const initializeApp = () => (dispatch:any) => {

    let promise = dispatch(getAuthUserDataThunkCreator())
    Promise.all([promise]).then(()=>{
        dispatch(setInitializedSuccess());
    });

}


export default appReducer;