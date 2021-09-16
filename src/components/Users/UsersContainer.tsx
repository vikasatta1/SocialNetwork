import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/reduxe-store";
import {
    toggleFollowingProgressAC,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    UserType, getUsers, followSuccess, unFollowSuccess, follow, unFollow,
} from "../../Redux/users-reducer";
import {AppActionsType} from "../../Redux/Store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";



type mapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}

type mapDispatchToProps = {
    followSuccess: (userId: number) => void
    unFollowSuccess: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgressAC:(isFetching: boolean ,userId: number ) => void
    getUsers:(currentPage:number,pageSize:number)=>void
    follow:(id: number)=> void
    unFollow:(id: number)=> void

}
type UsersPropsType = {
    users: Array<UserType>
   /* setUsers: (users: Array<UserType>) => void*/
  /*  setTotalUsersCount: (totalCount: number) => void*/
  /*  setCurrentPage: (currentPage: number) => void*/
   /* toggleIsFetching: (isFetching: boolean) => void*/
    totalUsersCount: number
    currentPage: number
    pageSize: number
    isFetching: boolean
    followingInProgress:[]
    getUsers:(currentPage:number,pageSize:number)=>void
    follow:(id: number)=> void
    unFollow:(id: number)=> void
}

class UsersContainer extends React.Component<UsersPropsType, AppActionsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize)
      /*  this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber,this.props.pageSize)
        /*this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)*/
        /*usersAPI.getUsers(pageNumber,this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items);
            });*/
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
                followingInProgress = {this.props.followingInProgress}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
            />
        </>
    }
}

const mapStateProps = (state: AppStateType): mapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}
/*
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToProps => {
    return {
        follow: (userId: number) => dispatch(follow(userId)),
        unFollow: (userId: number) => dispatch(unFollow(userId)),
        setUsers: (users: Array<UserType>) => dispatch(setUsers(users)),
        setCurrentPage: (pageNumber: number) => dispatch(setCurrentPage(pageNumber)),
        setTotalUsersCount: (totalCount: number) => dispatch(setTotalUsersCount(totalCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetching(isFetching)),

    }
}
*/



export default connect<mapStatePropsType, mapDispatchToProps, {}, AppStateType>(mapStateProps, {follow,unFollow,
    followSuccess, unFollowSuccess, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching,toggleFollowingProgressAC,
    getUsers
})(UsersContainer);


/*export default connect<mapStatePropsType, mapDispatchToProps, {}, AppStateType>(mapStateProps, mapDispatchToProps)(UsersContainer);*/