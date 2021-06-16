import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {dialogPageType} from "../../Redux/Store";

const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
type DialogsPropsType = {
    updateNewMessageBody: (body: any) => void
    sendMessage: () => void
    dialogsPage: dialogPageType
}

const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map(m => <Message message={m.message}/>);
    const newMessageBody = state.newMessageBody;
    const onSendMessageBody = () => {
        props.sendMessage();
    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value;
        props.updateNewMessageBody(body);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagesElements} </div>
                <div>
                    <div>
                        <textarea
                            value={newMessageBody}
                            onChange={onNewMessageChange}
                            placeholder='Enter your message'
                        />
                    </div>
                    <div>
                        <button onClick={onSendMessageBody}>Send</button>
                    </div>
                </div>
            </div>
        </div>)
}


export default Dialogs;