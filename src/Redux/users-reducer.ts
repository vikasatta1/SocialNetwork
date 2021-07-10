import {AppStateType} from "./reduxe-store";
import {AppActionsType} from "./Store";

export type UsersACType = FollowType | UnFollowType | SetUsersType | SetCurrentPageType
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
type SetCurrentPageType = {
    type:"SET_CURRENT_PAGE"
    currentPage:number
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
    pageSize: number
    totalUsersCount: number
    currentPage:number
}
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

const InitialState:UsersInitialStateType = {
    users:[],
    pageSize: 5,
    totalUsersCount:22,
    currentPage: 2

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
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
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
export const setCurrentPageAC = (currentPage:number) => ({type:SET_CURRENT_PAGE, currentPage:currentPage})



export default usersReducer;