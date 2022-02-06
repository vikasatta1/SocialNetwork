import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";


const initialState = {
    profile: null,
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText: '',
    status: "",

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
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case "SET_PHOTO_SUCCESS":
            return {...state, profile: {...state.profile, photos: action.photos} as any}
        default:
            return state
    }

}

// action

export const addPostActionCreator = (newPostText: string): AddPostActionType => {
    return {type: "ADD-POST", newPostText}
}
export const setUserProfileAC = (user: ProfileType): SetUserProfileType => ({type: "SET_USER_PROFILE", user})
export const setStatusAC = (status: string): SetStatus => ({type: "SET_STATUS", status})
export const deletePost = (postId: number) => ({type: "DELETE_POST", postId} as const)
export const setPhotoSuccess = (photos: File) => ({type: "SET_PHOTO_SUCCESS", photos} as const)

//thunk
export const getUserProfileThunkCreator = (userId: any) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data));
        })
}
export const getStatusThunk = (userId: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data))
}
export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        if (userId != null) {
            // @ts-ignore
            dispatch(getUserProfileThunkCreator(userId))
        } else {
            dispatch(stopSubmit("edit-profile", {_error:response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
            throw new Error("userId can't be null")
        }
    }
}
// type
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
    newPostText: string | null
}

export type ContactType = {
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
    small: string | null,
    large: string | null,
}
export type ProfileType = {
    aboutMe: string,
    contacts: ContactType
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
    | SetPhotoSuccessType
type DeletePostType = ReturnType<typeof deletePost>
type SetPhotoSuccessType = ReturnType<typeof setPhotoSuccess>


export default profileReducer;