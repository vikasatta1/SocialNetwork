import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator,} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {Dispatch} from 'redux';
import {dialogPageType} from "../../Redux/Store";

type MapStatePropsType = {
    dialogsPage: dialogPageType
    isAuth:boolean
}

type MapDispatchPropsType = {
    sendMessage:() => void
    updateNewMessageBody: (body: string) => void
}
export type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: () => dispatch(sendMessageCreator()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreator(body))
    }
}

const DialogsContainer = connect(mapStateProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;