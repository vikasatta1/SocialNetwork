import React from 'react';
import MyPosts from "../MyPosts";
import {
    addPostActionCreator,
    updateNewPostTextActionCreator
}
    from "../../../../Redux/profile-reducer";
import {StoreType} from "../../../../Redux/Store";
import {connect} from "react-redux";
import {AppStoreType} from "../../../../Redux/reduxe-store";


type MyPostsContainerPropsType = {
    store:StoreType
}
const mapStateProps = (state:AppStoreType) => {
    return {
        posts:state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        addPost:() =>{
            dispatch(addPostActionCreator);},
        updateNewPostText:(text: string) => {
            const action = updateNewPostTextActionCreator(text);
            dispatch(action)},

    }
}


const MyPostsContainer = connect(mapStateProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;