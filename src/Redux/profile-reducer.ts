import {AppActionsType, PostsType, profilePageType} from "./Store";

export type AddPostActionType = {
    type: "ADD-POST",
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}
export type SetUserProfileType = {
    type: "SET_USER_PROFILE"
    user:ProfileType
}

const ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"


const initialState = {
    profile: null,
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText: "",
}

type contactType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram:string,
    youtube: string ,
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
    userId: number,
    photos: photoType
}


const profileReducer = (state: profilePageType = initialState, action: AppActionsType): profilePageType => {
    if (action.type === "ADD-POST") {          /// если у экшена тип равен адд - сделаем логику добавления поста
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: state.newPostText,
            likesCount: 0
        };
        return  {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: ""
        };
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
        return  {
            ...state,
            newPostText: action.newText
        }; // иначе если тип равет
    }else if (action.type === "SET_USER_PROFILE") {
        return  {
            ...state,
            profile: action.user
        }; // иначе если тип равет
    }
    return state;
}



export const addPostActionCreator = (): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST"}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}
export const setUserProfileAC = (user: ProfileType) => ({type: "SET_USER_PROFILE", user})


export default profileReducer;