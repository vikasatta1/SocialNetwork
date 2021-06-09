import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {dialogPageType} from '../../Redux/State';

const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

type DialogsPropsType = {
    dialogsPage: dialogPageType
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs;