import React from 'react';
import {NavLink} from "react-router-dom";
import userPhoto from "../../images/user.png";
import styles from "./Users.module.css";
import {UserType} from "../../Redux/users-reducer";
export type UserPropsType = {
    user:UserType
    followingInProgress: []
    follow:(id: number)=> void
    unFollow:(id: number)=> void
}
const User = (props:UserPropsType) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={"/profile/" + props.user.id}>
                                <img src={props.user.photos.small ? props.user.photos.small : userPhoto} className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                            <div>
                                {props.user.followed

                                    ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                              onClick={() => {
                                                  props.unFollow(props.user.id)
                                              }
                                              }>Unfollow</button>

                                    : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                                              onClick={() => {
                                                  props.follow(props.user.id)
                                              }
                                              }>Follow</button>}
                            </div>
                        </span>
            <span>
                            <span>
                                <div>{props.user.name}</div><div>{props.user.status}</div>
                            </span>
                            <span>
                                <div>{"props.user.location.country"}</div>
                                <div>{"props.user.location.city"}</div>
                            </span>
                        </span>
        </div>
    );
};

export default User;