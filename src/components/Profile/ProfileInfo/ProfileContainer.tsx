import React from 'react';
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import {AppActionsType} from "../../../Redux/Store";
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import {ProfileType, setUserProfileAC} from "../../../Redux/profile-reducer";



type ProfilePropsType = {

}

type OwnProps = {
}

type OwnPropsType = mapStatePropsType & mapDispatchPropsType

type mapStatePropsType = {
    profile:ProfileType | null
}

type mapDispatchPropsType = {
    setUserProfileAC: (users:ProfileType ) => void
}


class ProfileContainer extends React.Component<OwnPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfileAC(response.data);
            })
    }
    render() {
        return (
            <ProfileInfo {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateProps =  (state: AppStateType): mapStatePropsType => ({
   profile: state.profilePage.profile
});


//
// let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps,  AppStateType>(mapStateProps, {setUserProfileAC})(ProfileContainer);