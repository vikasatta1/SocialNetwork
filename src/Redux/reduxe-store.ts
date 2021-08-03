import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersACType} from "./users-reducer";
import {DialogsActionsType, ProfileActionsType} from "./Store";
import authReducer, {authAT} from "./auth-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
   /* auth: authReducer,*/
});

export const store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ProfileActionsType | DialogsActionsType | UsersACType | authAT
/*
// @ts-ignore
window.store = store;
*/
