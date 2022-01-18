import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {DialogsPropsType} from "./DialogsContainer";
import {Field, reduxForm} from "redux-form";
import TextArea from "../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
export type NewMessageFormValuesType = {
    newMessageBody: string
}
const Message = (props: any) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
const Dialogs = (props: DialogsPropsType) => {
    const state = props.dialogsPage;

    const dialogsElements = state.dialogs.map((d:any )=> <DialogItem key={d.id} name={d.name} id={d.id}/>);
    const messagesElements = state.messages.map( (m:any) => <Message key={m.id} message={m.message}/>);
    const newMessageBody = state.newMessageBody;


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
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>)
}

const maxLength = maxLengthCreator(100)
const AddMessageForm = (props:any) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field component={TextArea}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength]}
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