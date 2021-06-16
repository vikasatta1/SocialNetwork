import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import {StoreType} from "../../Redux/Store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from '../../StoreContext';


const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
type DialogsPropsType = {
 store:StoreType
}

const DialogsContainer = () => {
    return <StoreContext.Consumer>
            {  store => {
                const onSendMessageClick = () => {
                    store.dispatch(sendMessageCreator())
                }
                const onNewMessageChange = (body: string) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }
                return <Dialogs updateNewMessageBody={onNewMessageChange}
                                sendMessage={onSendMessageClick}
                                dialogsPage={store.getState().dialogsPage}/>
            }
        }
        </StoreContext.Consumer>

}


export default DialogsContainer;