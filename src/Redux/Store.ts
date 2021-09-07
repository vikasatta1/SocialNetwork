import {

    ProfileActionsType,
    ProfileType,

} from "./profile-reducer";
import {DialogsActionType, } from "./dialogs-reducer";

import {UsersACType} from "./users-reducer";

type PostsType = {
    id: number
    message: string
    likesCount: number
}
type profilePageType = {
    profile: ProfileType | null
    posts: Array<PostsType>
    newPostText: string
}

type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
export type dialogPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
    newMessageBody: string
}
export type StatePropsType = {
    profilePage: profilePageType
    dialogsPage: dialogPageType
    sidebar: {}
}
export type StoreType = {
    _state: StatePropsType
    getState: () => StatePropsType
    _callSubscriber: (_state: StatePropsType) => void
    subscribe: (observer: () => void) => void
    dispatch: (action: AppActionsType ) => void
}


export type AppActionsType = ProfileActionsType | DialogsActionType | UsersACType



