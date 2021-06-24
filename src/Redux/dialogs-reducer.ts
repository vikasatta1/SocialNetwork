import {AppActionsType} from "./Store";

export type UpdateNewMessageBodyType = {
    type:"UPDATE-NEW-MESSAGE-BODY",
    body:string
}
export type SendMessageType = {
    type:"SEND_MESSAGE"
}
const initialState = {
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


const dialogsReducer = (state: dialogPageType = initialState, action: AppActionsType) => {
    if (action.type === "UPDATE-NEW-MESSAGE-BODY" ){
        state.newMessageBody = action.body;

    } else if (action.type === "SEND_MESSAGE" ){
        const body = state.newMessageBody;
        state.newMessageBody = "";
        state.messages.push( {id: 6, message: body});
    }
    return state
}


export const sendMessageCreator = ():SendMessageType => {
    return { type:"SEND_MESSAGE"}
}
export const updateNewMessageBodyCreator = ( body:string):UpdateNewMessageBodyType => {
    return {type:"UPDATE-NEW-MESSAGE-BODY", body:body}}

export default dialogsReducer;