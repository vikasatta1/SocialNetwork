import React from 'react';
import MyPosts, {PostsPropsType} from "../MyPosts";
import {
    addPostActionCreator,
    AddPostActionType,
    ChangeNewPostTextActionType,
    updateNewPostTextActionCreator
} from "../../../../Redux/profile-reducer";
import {StoreType} from "../../../../Redux/Store";

type MyPostsContainerPropsType = {
    store: StoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {
    const state = props.store.getState();
    const addPost = () => {
        // @ts-ignore
        props.store.dispatch(addPostActionCreator());
    }
    const onPostChange = (text: string) => {
        const action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action)
    }
    return (<MyPosts updateNewPostText={onPostChange} addPost={addPost}
                     posts={state.profilePage.posts}
                     newPostText={state.profilePage.newPostText}

    />)
}

export default MyPostsContainer;