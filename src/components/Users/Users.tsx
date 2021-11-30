import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../images/user.png";
import { UserType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

type UsersPropsType = {
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: []
    follow:(id: number)=> void
    unFollow:(id: number)=> void
}


const Users = (props: UsersPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    // @ts-ignore
                    return <span className={props.currentPage === p && styles.selectedPage}
                                 onClick={(e) => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
                })}
            </div>
            {props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={"/profile" + u.id}>
                                <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {u.followed

                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {props.unFollow(u.id)}
                                              }>Unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {props.follow(u.id)}
                                              }>Follow</button>}
                            </div>
                        </span>
                <span>
                            <span>
                                <div>{u.name}</div><div>{u.status}</div>
                            </span>
                            <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
            </div>)
            }
        </div>
    )
}
export default Users;
