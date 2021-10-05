import {AppStateType} from "./reduxe-store";

export const setUsers = (state:AppStateType) => {
return state.usersPage.users
}
export const setPageSize = (state:AppStateType) => {
return  state.usersPage.pageSize
}
export const getTotalUsersCount = (state:AppStateType) => {
return   state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:AppStateType) => {
return   state.usersPage.currentPage
}
export const getIsFetching = (state:AppStateType) => {
return   state.usersPage.isFetching
}
export const getFollowingInProgress = (state:AppStateType) => {
return   state.usersPage.followingInProgress
}