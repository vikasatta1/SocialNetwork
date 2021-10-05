import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";

import { logoutThunkCreator} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/reduxe-store";
import {RouteComponentProps, withRouter} from "react-router";


type OwnProps = {}
type PathParamsType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: false
}
type mapStatePropsType = {
    isAuth: boolean,
    login: null | string
}
type mapDispatchPropsType = {
    logoutThunkCreator:()=>void
}
export type HeaderPropsType = mapDispatchPropsType & mapStatePropsType
type OwnPropsType = mapStatePropsType & mapDispatchPropsType

// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
}

const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
let withUrlDataContainerComponent = withRouter(HeaderContainer)
export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
(mapStateProps, {logoutThunkCreator})(withUrlDataContainerComponent);
