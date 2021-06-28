import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {AppStoreType} from "../../Redux/reduxe-store";
import {Dispatch} from "redux";
import {
    followAC,
    setUsersAC,
    unfollowAC,
    UsersInitialStateType,
    UserType
} from "../../Redux/users-reducer";


type mapStatePropsType = {
    users:Array<UserType>
}
type mapDispatchToProps = {
    follow:(userId:number) => void
    unFollow:(userId:number) => void
    setUsers:(users:Array<UserType>) => void
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
        setUsers: (users:Array<UserType>) => dispatch(setUsersAC(users)),
    }
}

export const UsersContainer = connect<mapStatePropsType, mapDispatchToProps, {}, AppStoreType>(mapStateProps, mapDispatchToProps)(Users);
