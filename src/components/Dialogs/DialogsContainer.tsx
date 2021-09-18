import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator,} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {Dispatch} from 'redux';
import {dialogPageType} from "../../Redux/Store";
import {Redirect} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

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
let AuthRedirectComponent = WithAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;