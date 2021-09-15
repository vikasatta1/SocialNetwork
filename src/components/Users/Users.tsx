import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../images/user.png";
import {progressFollowing, toggleFollowingProgressAC, UserType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    toggleFollowingProgressAC: (isFetching: boolean,userId: number) => void
    followingInProgress: []
}


const Users = (props: UsersPropsType) => {

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // @ts-ignore
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

                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                        props.toggleFollowingProgressAC(true,u.id)
                                        axios.delete(
                                            `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': '18609265-abea-44e7-991b-d67c1c696dc2'
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.unFollow(u.id)
                                                }
                                                props.toggleFollowingProgressAC(false,u.id)
                                            });

                                    }}>Unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                        props.toggleFollowingProgressAC(true,u.id)
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            {}, {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': '18609265-abea-44e7-991b-d67c1c696dc2'
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                                props.toggleFollowingProgressAC(false,u.id)
                                            });
                                    }}>Follow</button>}
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
