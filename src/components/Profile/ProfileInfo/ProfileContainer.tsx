import React from 'react';
import {AppStateType} from "../../../Redux/reduxe-store";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUserProfileThunkCreator,
    ProfileType,
    updateStatus
} from "../../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from 'react-router';
import Profile from "../Profile";
import {compose} from "redux";


type OwnProps = {}
type PathParamsType = {
    userId: number | null
}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type mapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: number | null) => void
    getStatusThunk: (userId: number | null) => void
    updateStatus: (status: string) => void
}
// @ts-ignore
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getStatusThunk(userId)
    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}

const mapStateProps = (state: AppStateType): mapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});
export default compose<React.ComponentType>(
    connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
    (mapStateProps, {getUserProfileThunkCreator, getStatusThunk, updateStatus}),
    withRouter,
    /* WithAuthRedirect*/
)(ProfileContainer)
