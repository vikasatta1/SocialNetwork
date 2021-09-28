import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type UsersACType =
    FollowType
    | UnFollowType
    | SetUsersType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleIsFetching
    | FollowingProgress

type FollowType = {
    type: "FOLLOW"
    userId: number
};
type UnFollowType = {
    type: "UNFOLLOW"
    userId: number
};
type SetUsersType = {
    type: "SET_USERS"
    users: Array<UserType>
};
type SetCurrentPageType = {
    type: "SET_CURRENT_PAGE"
    currentPage: number
};
type SetTotalUsersCountType = {
    type: "SET_TOTAL_USERS_COUNT"
    count: number
};
type ToggleIsFetching = {
    type: "TOGGLE_IS_FETCHING"
    isFetching: boolean
}
type FollowingProgress = {
    type: "TOGGLE_IS_FOLLOWING_PROGRESS"
    isFetching: boolean
    userId: number
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
};
export type PhotosType = {
    small: null | string
    large: null | string
};

export type progressFollowing = {
    isFetching: boolean
    userId: number
}
export type UsersInitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
};
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const InitialState: UsersInitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};


export const usersReducer = (state = InitialState, action: AppActionsType): UsersInitialStateType => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case  UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            // @ts-ignore
            return {...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state

    }

};

export const followSuccess = (userId: number): FollowType => {
    return {type: FOLLOW, userId}
};
export const unFollowSuccess = (userId: number): UnFollowType => {
    return {type: UNFOLLOW, userId}
};
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCount = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number): FollowingProgress => ({
    type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId
});
export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}

export const follow = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true,id));
        usersAPI.follow(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(id))
                }
                dispatch(toggleFollowingProgressAC(false,id))
            });
    }
}

export const unFollow = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleFollowingProgressAC(true,id))
        usersAPI.unfollow(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollowSuccess(id))
                }
                dispatch(toggleFollowingProgressAC(false,id))
            });
    }
}

export default usersReducer;