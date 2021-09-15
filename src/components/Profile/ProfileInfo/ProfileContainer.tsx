import React from 'react';
import axios from "axios";
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import {ProfileType, setUserProfileAC} from "../../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router';
import Profile from "../Profile";


type OwnProps = {}
type PathParamsType = {
    userId: number
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    profile: ProfileType | null
}
type mapDispatchPropsType = {
    setUserProfileAC: (users: ProfileType) => void
}

// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfileAC(response.data);
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>

        )
    }
}

const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
});

let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
(mapStateProps, {setUserProfileAC})(withUrlDataContainerComponent);
