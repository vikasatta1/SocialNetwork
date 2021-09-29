import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator,} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {compose, Dispatch} from 'redux';
import {dialogPageType} from "../../Redux/Store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStatePropsType = {
    dialogsPage: dialogPageType
}
type MapDispatchPropsType = {
    sendMessage: (newMessageBody:string) => void
    updateNewMessageBody: (body: string) => void
}
export type DialogsPropsType = MapDispatchPropsType & MapStatePropsType

const mapStateProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody:string) => dispatch(sendMessageCreator(newMessageBody)),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyCreator(body))
    }
}
export default compose<React.ComponentType>(
    connect(mapStateProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)
/*
let AuthRedirectComponent = WithAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateProps, mapDispatchToProps)(AuthRedirectComponent);
*/

/*
export default DialogsContainer;*/
