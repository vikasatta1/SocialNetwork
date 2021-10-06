import {AppStateType} from "./reduxe-store";
import {createSelector} from "reselect";
type Selector<S> = (state: AppStateType) => S;

 const getUsersSelector = (state:AppStateType) => {
    return state.usersPage.users
}


export const getIsFetching = (state:AppStateType) => {
    return   state.usersPage.isFetching
}
export const getUsers = createSelector(getUsersSelector,
    (users,) => {

    return  users.filter(u => true);
})





export const setPageSize = (state:AppStateType) => {
return  state.usersPage.pageSize
}
export const getTotalUsersCount = (state:AppStateType) => {
return   state.usersPage.totalUsersCount
}
export const getCurrentPage = (state:AppStateType) => {
return   state.usersPage.currentPage
}

export const getFollowingInProgress = (state:AppStateType) => {
return   state.usersPage.followingInProgress
}