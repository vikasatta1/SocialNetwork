import React from 'react';
import ProfileInfo from "./ProfileInfo";
import axios from "axios";
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import {ProfileType, setUserProfileAC} from "../../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router';

type PathParamsType = {
    userId: string
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    profile: ProfileType | null
}
type mapDispatchPropsType = {
    setUserProfileAC: (users: ProfileType) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
       /* if (!userId) {
            userId = 2;
        }*/
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/userId`)
            .then(response => {
                this.props.setUserProfileAC(response.data);
            })
    }

    render() {
        return (
            <ProfileInfo {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
});


// @ts-ignore
let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect<mapStatePropsType, mapDispatchPropsType,PropsType, AppStateType>
(mapStateProps, {setUserProfileAC})(withUrlDataContainerComponent);
