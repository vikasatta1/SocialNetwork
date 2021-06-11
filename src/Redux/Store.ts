import profileReducer, {AddPostActionType, ChangeNewPostTextActionType} from "./profile-reducer";
import dialogsReducer, {SendMessageType, UpdateNewMessageBodyType} from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
type DialogsType = {
    id: number
    name: string
}
export type profilePageType = {
    posts: Array<PostsType>
    newPostText: string

}
type MessagesType = {
    id: number
    message: string
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

export type ProfileActionsType = AddPostActionType | ChangeNewPostTextActionType
export type DialogsActionsType = UpdateNewMessageBodyType | SendMessageType
export type AppActionsType = ProfileActionsType | DialogsActionsType


const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 12},
                {id: 2, message: "it's my first post", likesCount: 11},
            ],
            newPostText: ""
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "How are you"},
                {id: 3, message: "How are you"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
                {id: 6, message: "Yo"}
            ],
            dialogs: [
                {id: 1, name: "Рик Санчез"},
                {id: 2, name: "Морти Смит"},
                {id: 3, name: "Бет Смит"},
                {id: 4, name: "Джери Смит"},
                {id: 5, name: "Натан"},
                {id: 6, name: "Огурчик Рик"},
            ],
            newMessageBody: ""
        },
        sidebar: {}

    },
    _callSubscriber() {
        console.log("State changed")
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state)
    }
}

export default store;
// @ts-ignore
window.store = store;

///37 lesson OOP;