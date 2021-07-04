import {AppStateType} from "./reduxe-store";
import {AppActionsType} from "./Store";

export type UsersACType = FollowType | UnFollowType | SetUsersType
 type FollowType = {
    type:"FOLLOW"
    userId:number
}
 type UnFollowType = {
    type:"UNFOLLOW"
    userId:number
}
type SetUsersType = {
    type: "SET_USERS"
    users:Array<UserType>
}

export type UserType = {
    name:string
    id:number
    photos:PhotosType
    status:string
    followed: boolean
   /* location:UsersLocation*/
}

export type PhotosType = {
    small: null | string
    large: null | string
}
 type UsersLocation = {
    city:string
    country:string
}
export type UsersInitialStateType = {
    users: Array<UserType>
}
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"

const InitialState:UsersInitialStateType = {
    users:[]
      /*{
            id:1,
            photoUrl:"https://sci-fi-news.ru/wp-content/uploads/2018/03/Rick-and-Morty-14-Morty-is-Insane-850x500.jpg",
            followed: false,
            fillName:"Mo",
            status:"I am boss",
            location: {city: "Minsk", country: "Belarus"}},
        {
            id:2,
            photoUrl:"https://i.pinimg.com/236x/7c/94/c1/7c94c1a26d55c0dcbf18be3dda271bef.jpg",
            followed: true,
            fillName:"Cucumber",
            status:"I am boss too",
            location: {city: "Minsk", country: "Belarus"}},
        {
            id:3,
            photoUrl:"https://i.pinimg.com/236x/7c/94/c1/7c94c1a26d55c0dcbf18be3dda271bef.jpg",
            followed: false,
            fillName:"Anny",
            status:"I am boss too",
            location: {city: "Moscow", country: "Russia"}},
    ]*/
}



export const usersReducer = (state = InitialState, action: AppActionsType):UsersInitialStateType => {
    switch (action.type){
        case  FOLLOW:
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u,followed: true}
                    }
            return u;
        })
            }
        case  UNFOLLOW:
            return  {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u,followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:{
            return {...state, users:  action.users}
        }

        default:
            return state

    }

}

export const followAC = (userId:number):FollowType => {
    return {type:FOLLOW, userId}
}
export const unfollowAC = (userId:number):UnFollowType => {
    return {type:UNFOLLOW, userId}
}
export const setUsersAC = (users:Array<UserType>) => ({type: SET_USERS, users})



export default usersReducer;