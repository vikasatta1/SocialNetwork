import React from "react";
import {UserType} from "../../Redux/users-reducer";
import Paginator from "../common/Padinator/Paginator";
import User from "./User";

type UsersPropsType = {
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: []
    follow: (id: number) => void
    unFollow: (id: number) => void
}


const Users = (props: UsersPropsType) => {
    return (
        <div>
            <Paginator pageSize={props.pageSize}
                       totalUsersCount={props.totalUsersCount}
                       onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage}/>
            {props.users.map(u =>
                <User key={u.id}
                      user={u}
                      unFollow={props.unFollow}
                      follow={props.follow}
                      followingInProgress={props.followingInProgress}
                />)
            }
        </div>
    )
}
export default Users;
