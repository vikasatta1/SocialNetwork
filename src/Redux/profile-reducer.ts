import {AppActionsType, PostsType, ProfileActionsType, profilePageType} from "./Store";

export type AddPostActionType = {
    type: "ADD-POST",
    newPostText: string
}
export type ChangeNewPostTextActionType = {
    type: "UPDATE-NEW-POST-TEXT",
    newText: string
}

const profileReducer = (state: profilePageType, action: AppActionsType) => {
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

    return state
}

export const addPostActionCreator = (newPostText: string): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST", newPostText: newPostText}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}


export default profileReducer;