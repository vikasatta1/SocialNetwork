import {combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionsType} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, {UsersACType} from "./users-reducer";
import {DialogsActionsType} from "./Store";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

export const store = createStore(rootReducer);

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ProfileActionsType | DialogsActionsType | UsersACType
/*
// @ts-ignore
window.store = store;
*/
