import React from 'react';
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUserProfileThunkCreator,
    ProfileType,
    updateStatusThunk
} from "../../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router';
import Profile from "../Profile";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";



type OwnProps = {}
type PathParamsType = {
    userId: number
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType

type mapStatePropsType = {
    profile: ProfileType | null
    status: string
}
type mapDispatchPropsType = {
    getUserProfileThunkCreator: ( userId: number) => void
    getStatus:(userId:number) => void
    updateStatusThunk:(status:string) => void
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
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status = {this.props.status}
                     updateStatusThunk={this.props.updateStatusThunk}/>

        )
    }
}
const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
});


export default compose<React.ComponentType>(
    connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
    (mapStateProps, {getUserProfileThunkCreator,getStatus,updateStatusThunk}),
    withRouter,
   /* WithAuthRedirect*/
)(ProfileContainer)


/*
let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)
let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)
export default connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
(mapStateProps, {getUserProfileThunkCreator})(withUrlDataContainerComponent);
*/
