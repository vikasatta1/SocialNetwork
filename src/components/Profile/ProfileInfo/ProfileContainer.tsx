import React from 'react';
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import {AppActionsType} from "../../../Redux/Store";
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import { Dispatch } from 'redux';



type ProfilePropsType = {

}
type mapStatePropsType = {
    a:number
}

class ProfileContainer extends React.Component<any, AppActionsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
            })
    }
    render() {
        return (
            <ProfileInfo {...this.props} />
        )
    }
}

const mapStateProps =  (state: AppStateType): mapStatePropsType => ({
    a: 13
})
const mapDispatchToProps = (dispatch: Dispatch)  => {
    return {

    }}




export default connect(mapStateProps, mapDispatchToProps)(ProfileContainer);