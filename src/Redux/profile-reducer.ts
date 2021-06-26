import {AppActionsType, PostsType, ProfileActionsType, profilePageType} from "./Store";

export type AddPostActionType = {
    type: "ADD-POST",
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
    newPostText: "4wewe"
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

/*switch (action.type) {
    case ADD - POST:{
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: state.newPostText,
            likesCount: 0
        };
        const stateCopy = {...state}
        stateCopy.posts = [...state.posts]
        stateCopy.posts.push(newPost);
        stateCopy.newPostText = "";
        return stateCopy;
    }
    case UPDATE-NEW-POST-TEXT: {
        const stateCopy = {...state}       // иначе если тип равет
        stateCopy.newPostText = action.newText;
        return stateCopy;
    }
    default:
        return state;
}*/


export const addPostActionCreator = (): AddPostActionType => {          //возвращает action
    return {type: "ADD-POST"}
}
export const updateNewPostTextActionCreator = (newText: string): ChangeNewPostTextActionType => {
    return {type: "UPDATE-NEW-POST-TEXT", newText: newText}
}


export default profileReducer;