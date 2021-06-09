import {rerenderEntireTree} from "../index";


type PostsType = {
    id: number
    message: string
    likesCount: number
}

type DialogsType = {
    id: number
    name: string
}

export type profilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

type MessagesType ={
    id: number
    message: string
}
export type dialogPageType = {
    messages: Array<MessagesType>
    dialogs: Array<DialogsType>
}

export type StatePropsType = {
    profilePage: profilePageType
    dialogsPage: dialogPageType
}

 let state: StatePropsType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 12},
            {id: 2, message: "it's my first post", likesCount: 11},
        ],
        newPostText: "bhjvvhj"
    },
    dialogsPage: {
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "How are you"},
            {id: 3, message: "How are you"},
            {id: 4, message: "Yo"},
            {id: 5, message: "Yo"},
            {id: 6, message: "Yo"}
        ],
        dialogs: [
            {id: 1, name: "Рик Санчез"},
            {id: 2, name: "Морти Смит"},
            {id: 3, name: "Бет Смит"},
            {id: 4, name: "Джери Смит"},
            {id: 5, name: "Натан"},
            {id: 6, name: "Огурчик Рик"},
        ],
    }
}




export  const addPost = () => {
    const newPost: PostsType = {
        id: new Date().getTime(),
        message:state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = "";
    rerenderEntireTree(state);
}
export  const updateNewPostText = (newText:string) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}




export default state;