import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {AppStoreType} from "../../Redux/reduxe-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersPageType, userType} from "../../Redux/users-reducer";

export type UsersPropsType = mapStatePropsType | mapDispatchToProps
type mapStatePropsType = {users:any}
type mapDispatchToProps = {
    follow:(userId:number) => void
    unFollow:(userId:number) => void
    setUsers:(users:any) => void
}

const mapStateProps = (state: AppStoreType):mapStatePropsType => {
    return{
        users: state.usersPage.users
    }
}
const mapDispatchToProps = (dispatch: Dispatch):mapDispatchToProps => {
    return {
        follow: (userId:number) => dispatch(followAC(userId)),
        unFollow: (userId:number) => dispatch(unfollowAC(userId)),
        setUsers: (users:any) => dispatch(setUsersAC(users)),
    }
}

export const UsersContainer = connect(mapStateProps, mapDispatchToProps)(Users);
