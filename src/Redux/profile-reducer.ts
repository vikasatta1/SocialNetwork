import {AppActionsType, PostsType, ProfileActionsType, profilePageType} from "./Store";

export type AddPostActionType = {
    type: "ADD-POST",
    newPostText: string
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}
const initialState = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 12},
            {id: 2, message: "it's my first post", likesCount: 11},
        ],
        newPostText: ""
    }
const profileReducer = (state: profilePageType = initialState, action: AppActionsType): any => {
    if (action.type === "ADD-POST") {          /// если у экшена тип равен адд - сделаем логику добавления поста
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: state.newPostText,
            likesCount: 0
        };
        state.posts.push(newPost);
        state.newPostText = "";
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {        // иначе если тип равет
        state.newPostText = action.newText;

    }

    return state;
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST", newPostText: newPostText}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}


export default profileReducer;