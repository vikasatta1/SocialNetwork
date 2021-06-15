import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {StoreType} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
type DialogsPropsType = {
    store: StoreType
}

const DialogsContainer = (props: DialogsPropsType) => {
    const state = props.store.getState().dialogsPage;
    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }
    const onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }
    return (<Dialogs
                     updateNewMessageBody={onNewMessageChange}
                     sendMessage={onSendMessageClick}
                     dialogsPage={state}
    />)
}


export default DialogsContainer;