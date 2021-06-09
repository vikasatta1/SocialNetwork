import {log} from "util";

type PostsType = {
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
    newMessageBody:string

}
export type StatePropsType = {
    profilePage: profilePageType
    dialogsPage: dialogPageType
    sidebar:{}
}
export type StoreType = {
    _state: StatePropsType
    getState: () => StatePropsType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: AddPostActionType|ChangeNewPostTextActionType| UpdateNewMessageBodyType | SendMessageType) => void
}

export type AddPostActionType = {
    type:"ADD-POST",
    newPostText:string
}
export type ChangeNewPostTextActionType = {
    type:"UPDATE-NEW-POST-TEXT",
    newText:string
}
export type UpdateNewMessageBodyType = {
    type:"UPDATE-NEW-MESSAGE-BODY",
    body:string
}
export type SendMessageType = {
    type:"SEND_MESSAGE"
}

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
            newMessageBody:""
        },
        sidebar:{}

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
        if (action.type === "ADD-POST") {          /// если у экшена тип равен адд - сделаем логику добавления поста
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber();
        } else if (action.type === "UPDATE-NEW-POST-TEXT"){        // иначе если тип равет
            store._state.profilePage.newPostText = action.newText;
            this._callSubscriber();
        } else if (action.type === "UPDATE-NEW-MESSAGE-BODY" ){
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber()
        } else if (action.type === "SEND_MESSAGE" ){
            const body = this._state.dialogsPage.newMessageBody;
            this._state.dialogsPage.newMessageBody = "";
            this._state.dialogsPage.messages.push( {id: 6, message: body});
            this._callSubscriber()
        }
    }

}
export const addPostActionCreator = (newPostText:string):AddPostActionType => {          //возвращает action
    return {type: "ADD-POST", newPostText: newPostText}}

export const updateNewPostTextActionCreator =(newText:string):ChangeNewPostTextActionType => {
    return{type: "UPDATE-NEW-POST-TEXT", newText: newText}}
export const sendMessageCreator = ():SendMessageType => {
    return { type:"SEND_MESSAGE"}
}
export const updateNewMessageBodyCreator = ( body:string):UpdateNewMessageBodyType => {
    return {type:"UPDATE-NEW-MESSAGE-BODY", body:body}}
export default store;
// @ts-ignore
window.store = store;

///37 lesson OOP;