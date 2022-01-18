import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

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
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

const initialState = {
    users:  [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>
};

export type InitialState = typeof initialState
export const usersReducer = (state = initialState, action: AppActionsType): InitialState => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users,action.userId,"id",{followed: true})
            }
        case  UNFOLLOW:
            return {
                ...state,
                users:updateObjectInArray(state.users,action.userId,"id",{followed: false})
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
            return {
                ...state,
                followingInProgress: action.isFetching
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
export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowflow = async (dispatch: Dispatch, id: number,apiMethod:any,actionCreator:any) => {
    dispatch(toggleFollowingProgressAC(true, id));
    let response = await apiMethod(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleFollowingProgressAC(false, id))
}

export const follow = (id: number) => {
    return async (dispatch: Dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator = followSuccess;
        followUnfollowflow(dispatch,id,apiMethod,actionCreator)
    }
}

export const unFollow = (id: number) => {
    return async (dispatch: Dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI)
        let actionCreator = unFollowSuccess;
        followUnfollowflow(dispatch,id,apiMethod,actionCreator)
    }
}

export default usersReducer;