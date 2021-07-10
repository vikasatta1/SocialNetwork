import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../Redux/reduxe-store";
import {Dispatch} from "redux";
import {
    followAC, setCurrentPageAC,
    setUsersAC,
    unfollowAC,
    UserType
} from "../../Redux/users-reducer";


type mapStatePropsType = {
    users:Array<UserType>
    pageSize: number
    totalUsersCount:number
    currentPage: number
}
type mapDispatchToProps = {
    follow:(userId:number) => void
    unFollow:(userId:number) => void
    setUsers:(users:Array<UserType>) => void
    setCurrentPage: (pageNumber:number) => void
}
const mapStateProps = (state: AppStateType):mapStatePropsType => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToProps => {
    return {
        follow: (userId:number) => dispatch(followAC(userId)),
        unFollow: (userId:number) => dispatch(unfollowAC(userId)),
        setUsers: (users:Array<UserType>) => dispatch(setUsersAC(users)),
        setCurrentPage: (pageNumber:number) => dispatch(setCurrentPageAC(pageNumber))

    }
}

export const UsersContainer = connect<mapStatePropsType, mapDispatchToProps, {}, AppStateType>(mapStateProps, mapDispatchToProps)(Users);
