import React from 'react';
import MyPosts from "../MyPosts";
import {
    addPostActionCreator,
    updateNewPostTextActionCreator
}
    from "../../../../Redux/profile-reducer";
import StoreContext from "../../../../StoreContext";
import {StoreType} from "../../../../Redux/Store";

type MyPostsContainerPropsType = {
    store:StoreType
}

const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>{
            (store) => {
                const state = store.getState();
                const addPost = () => {
                    // @ts-ignore
                    store.dispatch(addPostActionCreator());
                }
                const onPostChange = (text: string) => {
                    const action = updateNewPostTextActionCreator(text);
                    store.dispatch(action)
                }
                return <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                                posts={state.profilePage.posts}
                                newPostText={state.profilePage.newPostText}/>
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer;