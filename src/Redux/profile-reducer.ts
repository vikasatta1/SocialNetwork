import {AppActionsType, PostsType, ProfileActionsType, profilePageType} from "./Store";



export type AddPostActionType = {
    type: "ADD-POST",
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}
const  ADD_POST = "ADD_POST"
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "it's my first post", likesCount: 11},
    ],
    newPostText: ""
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

    }
    return state;
}



export const addPostActionCreator = (): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST"}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}


export default profileReducer;