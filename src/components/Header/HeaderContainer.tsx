import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/reduxe-store";
import {RouteComponentProps, withRouter} from "react-router";

type OwnProps = {}
type PathParamsType = {
    id:  number | null,
    email: string | null,
    login: string | null,
    isAuth: false
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType

// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
class HeaderContainer extends React.Component<PropsType>  {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,{
            withCredentials:true //ваша авторизация
            })
            .then(response => {
              if (response.data.resultCode === 0){
                  let {id,email,login} = response.data.data;
                  this.props.setAuthUserData(id,email,login, true);
              }
            });
    }

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }
}
type mapStatePropsType = {
    isAuth: boolean,
    login: null | string
}
type mapDispatchPropsType = {
    setAuthUserData: (id: number, email: string, login: string, isAuth: boolean) => void
}
export type HeaderPropsType = mapDispatchPropsType & mapStatePropsType
const mapStateProps = (state:AppStateType):mapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
const mapDispatchTiProps = (dispatch: Dispatch) => {

}
let withUrlDataContainerComponent = withRouter(HeaderContainer)

export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
(mapStateProps, {setAuthUserData})(withUrlDataContainerComponent);
