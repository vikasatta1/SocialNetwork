import React from "react";
import styles from './Users.module.css';
import {UserType} from "../../Redux/users-reducer";


type UsersPropsType = {
    users:Array<UserType>
    follow:(userId:number) => void
    unFollow:(userId:number) => void
    setUsers:(users:Array<UserType>) => void
}

export function Users (props: UsersPropsType) {

    if (props.users.length === 0){
    props.setUsers([
        {id:1,
            photoUrl:"https://static.wikia.nocookie.net/rickandmorty/images/0/02/%D0%97%D0%BB%D0%BE%D0%B9_%D0%9C%D0%BE%D1%80%D1%82%D0%B8_001.jpg/revision/latest?cb=20190714125714&path-prefix=ru",
            followed: false,
            fillName:"Mo",
            status:"I am boss",
            location: {city: "Minsk", country: "Belarus"}},
        {id:2,
            photoUrl:"https://static.wikia.nocookie.net/rickandmorty/images/0/02/%D0%97%D0%BB%D0%BE%D0%B9_%D0%9C%D0%BE%D1%80%D1%82%D0%B8_001.jpg/revision/latest?cb=20190714125714&path-prefix=ru",
            followed: true,
            fillName:"Cucumber",
            status:"I am boss too",
            location: {city: "Minsk", country: "Belarus"}},
        {id:3,
            photoUrl:"https://static.wikia.nocookie.net/rickandmorty/images/0/02/%D0%97%D0%BB%D0%BE%D0%B9_%D0%9C%D0%BE%D1%80%D1%82%D0%B8_001.jpg/revision/latest?cb=20190714125714&path-prefix=ru",
            followed: false,
            fillName:"Anny",
            status:"I am boss too",
            location: {city: "Moscow", country: "Russia"}},
    ])
     }
    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photoUrl} className={styles.userPhoto}/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={ () => {props.unFollow( u.id)}}>Unfollow</button>
                                    : <button onClick={ () => {props.follow( u.id)}}>Follow</button>}
                            </div>
                        </span>
                    <span>
                            <span>
                                <div>{u.fillName}</div><div>{u.status}</div>
                            </span>
                            <span>
                                <div>{u.location.country}</div>
                                <div>{u.location.city}</div>
                            </span>
                        </span>
                </div>)
            }
        </div>
    )
}

export default Users;