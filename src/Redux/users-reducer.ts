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