import React from "react";
import {AppActionsType} from "../../Redux/Store";
import {UsersInitialStateType, UserType} from "../../Redux/users-reducer";
import userPhoto from "../../images/user.png";
import styles from "./Users.module.css";
import axios from "axios";

type UsersPropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage:number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number


}

class Users extends React.Component<UsersPropsType, AppActionsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }
    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = [];
        for (let i=1; i <= pagesCount; i++ ){
            pages.push(i);
        }
        return (<div>
                <div>
                    {pages.map(p => {
                        // @ts-ignore
                        return   <span className={this.props.currentPage === p && styles.selectedPage}
                        onClick={()=>{this.props.setCurrentPage(p)}}>{p}</span>
                    })}
                </div>
                {
                    this.props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        this.props.unFollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
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
}


export default Users;