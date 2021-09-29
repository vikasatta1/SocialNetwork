import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage;
    const dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map( m => <Message key={m.id} message={m.message}/>);
    const newMessageBody = state.newMessageBody;
    const onSendMessageBody = () => {

    }
    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const body = e.target.value;
        props.updateNewMessageBody(body);
    }
    const addNewMessage = (value:any) => {
        props.sendMessage(value.newMessageBody);
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagesElements} </div>
                    {/*<div><textarea
                            value={newMessageBody}
                            onChange={onNewMessageChange}
                            placeholder='Enter your message'
                        />
                    </div>
                    <div><button onClick={onSendMessageBody}>Send</button>
                    </div>*/}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>)
}


const AddMessageForm = (props:any) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={'textarea'}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                />
            </div>
            <div><button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"})(AddMessageForm)
export default Dialogs;