import {AppActionsType, dialogPageType} from "./Store";

export type UpdateNewMessageBodyType = {
    type:"UPDATE-NEW-MESSAGE-BODY",
    body:string
}
export type SendMessageType = {
    type:"SEND_MESSAGE"
}

const dialogsReducer = (state: dialogPageType, action: AppActionsType) => {
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