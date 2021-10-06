import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {
    UserType, requestUsers, unFollowSuccess, follow, unFollow,
} from "../../Redux/users-reducer";
import {AppActionsType} from "../../Redux/Store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getTotalUsersCount, getUsers,
    setPageSize,
} from "../../Redux/users-selectors";



type mapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}

type mapDispatchToProps = {
    unFollowSuccess: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void

}
type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress: []
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (id: number) => void
    unFollow: (id: number) => void
}

class UsersContainer extends React.Component<UsersPropsType, AppActionsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
            />
        </>
    }
}
const mapStateProps = (state: AppStateType): mapStatePropsType => {
    console.log("map Users")
    return {
        users: getUsers(state),
        pageSize: setPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}
export default compose(
    connect<mapStatePropsType, mapDispatchToProps, {}, AppStateType>
    (mapStateProps, {follow, unFollow, unFollowSuccess, getUsers: requestUsers}))(UsersContainer)