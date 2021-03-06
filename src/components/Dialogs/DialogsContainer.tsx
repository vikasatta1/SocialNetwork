import React from 'react';
import {sendMessageCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {compose, Dispatch} from 'redux';

import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
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
type MapStatePropsType = {
    dialogsPage: dialogPageType
}
type MapDispatchPropsType = {
    sendMessage: (newMessageBody:string) => void
}
export type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody:string) => {
            dispatch(sendMessageCreator(newMessageBody))}
    }
}
export default compose<React.ComponentType>(
    connect(mapStateProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)
