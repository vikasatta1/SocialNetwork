import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {stat} from "fs";


const initialState = {
    profile: null,
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText:'',
    status: ""
}
const profileReducer = (state: profilePageType = initialState, action: AppActionsType): profilePageType => {
    switch (action.type) {
        case "ADD-POST": {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case "SET_USER_PROFILE":
            return {
                ...state,
                profile: action.user
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(p=> p.id != action.postId)
            }
        default:
            return state
    }

}


export const addPostActionCreator = (newPostText: string): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST", newPostText}
}
export const setUserProfileAC = (user: ProfileType): SetUserProfileType => ({type: "SET_USER_PROFILE", user})
export const setStatusAC = (status: string): SetStatus => ({type: "SET_STATUS", status})
export const deletePost = (postId: number) => ({type: "DELETE_POST", postId} as const)
export const getUserProfileThunkCreator = (userId: any) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data));
        })
}
export const getStatusThunk = (userId: any) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusAC(response.data))
        })
}
export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(response.data))
            }
        })
}
export type AddPostActionType = {
    type: "ADD-POST",
    newPostText: string
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newPostText: string
}
export type SetUserProfileType = {
    type: "SET_USER_PROFILE"
    user: ProfileType
}
export type SetStatus = {
    type: "SET_STATUS"
    status: string
}



export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type profilePageType = {
    profile: ProfileType | null
    posts: Array<PostsType>
    status: string
    newPostText:string | null
}

type contactType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}

type photoType = {
    small: string,
    large: string,
}
export type ProfileType = {
    aboutMe: string,
    contacts: contactType
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number | null,
    photos: photoType
}
export type ProfileActionsType =
    AddPostActionType
    | ChangeNewPostTextActionType
    | SetUserProfileType
    | SetStatus
    | DeletePostType
type DeletePostType = ReturnType<typeof deletePost>

export default profileReducer;