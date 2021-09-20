import React from 'react';
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import {getUserProfileThunkCreator, ProfileType} from "../../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router';
import Profile from "../Profile";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect";



type OwnProps = {}
type PathParamsType = {
    userId: number
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType

type mapStatePropsType = {
    profile: ProfileType | null

}
type mapDispatchPropsType = {
    getUserProfileThunkCreator: ( userId: number) => void
}

// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfileThunkCreator(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>

        )
    }
}
let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)


const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile
});

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
(mapStateProps, {getUserProfileThunkCreator})(withUrlDataContainerComponent);
