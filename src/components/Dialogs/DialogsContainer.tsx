import React from 'react';
import s from './Dialogs.module.css';
import {
    dialogPageType,
    sendMessageCreator,
    updateNewMessageBodyCreator,
} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStoreType} from "../../Redux/reduxe-store";
import { Dispatch } from 'redux';

const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
type MapStateProps = {
    dialogsPage:dialogPageType
}

type MapDispatchPropsType = {
    updateNewMessageBody:() => void
    sendMessage: (body: string) => void
}
export type DialogsPropsType = MapDispatchPropsType & MapStateProps

const mapStateProps = (state: AppStoreType):MapStateProps => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageBody: () => dispatch(sendMessageCreator()),
        sendMessage: (body: string) => dispatch(updateNewMessageBodyCreator(body))
    }
}



const DialogsContainer = connect(mapStateProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;