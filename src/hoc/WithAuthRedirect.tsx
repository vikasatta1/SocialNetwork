import React from 'react';
import {Redirect} from "react-router-dom";
import {AppStateType} from "../Redux/reduxe-store";
import {connect} from "react-redux";
type mapStatePropsForRedirectType = {
    isAuth:boolean
}
const mapStatePropsForRedirect = (state: AppStateType):mapStatePropsForRedirectType => ({
    isAuth: state.auth.isAuth
});
export const WithAuthRedirect = (Component:any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props}/>
        }
    }

   let ConnectedAuthRedirectComponent = connect(mapStatePropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
};

