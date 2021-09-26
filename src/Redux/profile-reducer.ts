import {AppActionsType} from "./reduxe-store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

export type AddPostActionType = {
    type: "ADD-POST",
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}
export type SetUserProfileType = {
    type: "SET_USER_PROFILE"
    user: ProfileType
}
export type SetStatus = {
    type: "SET_STATUS"
    status: string
}

const initialState = {
    profile: null,
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText: "",
    status: ""
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type profilePageType = {
    profile: ProfileType | null
    posts: Array<PostsType>
    newPostText: string
    status: string
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

const profileReducer = (state: profilePageType = initialState, action: AppActionsType): profilePageType => {




    if (action.type === "ADD-POST") {          /// если у экшена тип равен адд - сделаем логику добавления поста
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: state.newPostText,
            likesCount: 0
        };
        return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: ""
        };
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
        return {
            ...state,
            newPostText: action.newText
        }; // иначе если тип равет
    } else if (action.type === "SET_USER_PROFILE") {
        return {
            ...state,
            profile: action.user
        }; // иначе если тип равет
    }
    else if (action.type === "SET_STATUS"){
        return {
            ...state,
            status:action.status
        }
    }
    return state;

    /*switch (action.type) {
        case "ADD-POST": {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case "UPDATE-NEW-POST-TEXT":
        return {
            ...state,
            newPostText: action.newText
        }
    }*/

}


export const addPostActionCreator = (): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST"}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}
export const setUserProfileAC = (user: ProfileType): SetUserProfileType => ({type: "SET_USER_PROFILE", user})
export const setStatusAC = (status:string): SetStatus => ({type: "SET_STATUS", status})
export const getUserProfileThunkCreator = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data));
        })
}
export const getStatusThunk = (userId: number) => (dispatch:Dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusAC(response.data))
        })
}
export const updateStatusThunk = (status:string) => (dispatch:Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(response.data))
            }
        })
}
export default profileReducer;