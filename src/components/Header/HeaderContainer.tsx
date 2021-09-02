import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/reduxe-store";



class HeaderContainer extends React.Component<any, any>  {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`,{
            withCredentials:true
            })
            .then(response => {
              if (response.data.resultCode === 0){
                  let {id,email,login} = response.data.data;
                  this.props.setAuthUserData(id,email,login);
              }
            });
    }

    render() {
        return (
            <Header {...this.props} isAuth={this.props.isAuth} login={this.props.login}/>
        );
    }


}
type MapStatePropsType = {
    isAuth: boolean,
    login: null | string
}
type MapDispatchPropsType = {

}
export type HeaderPropsType = MapDispatchPropsType & MapStatePropsType
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
const mapDispatchTiProps = (dispatch: Dispatch) => {

}
export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer);