import {AppActionsType} from "./Store";

const Send = "SEND_MESSAGE"
export type SendMessageType = {
    type: "SEND_MESSAGE",
    newMessageBody:string
}
const initialState = {
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "How are you"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
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

export type DialogsActionType = SendMessageType

const dialogsReducer = (state = initialState, action: AppActionsType): dialogPageType => {
    switch (action.type) {
        case Send:{
                const body = action.newMessageBody;
                return {
                    ...state,
                    messages: [...state.messages, {id: state.messages.length, message: body}]
                };
            }
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody:string): SendMessageType => {
    return {type: "SEND_MESSAGE",newMessageBody}
}
export default dialogsReducer;