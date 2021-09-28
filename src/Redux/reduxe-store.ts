import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsType} from "./profile-reducer";
import dialogsReducer, {DialogsActionType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersACType} from "./users-reducer";
import authReducer, {authAT} from "./auth-reducer";
import thunkMiddleware  from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ProfileActionsType | DialogsActionType | UsersACType | authAT
// @ts-ignore
window.store = store;
