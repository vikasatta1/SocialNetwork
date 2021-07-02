import React from 'react';
import MyPosts from "../MyPosts";
import {
    addPostActionCreator,
    updateNewPostTextActionCreator
}
    from "../../../../Redux/profile-reducer";
import {StoreType} from "../../../../Redux/Store";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/reduxe-store";
import {Dispatch} from "redux";

const mapStateProps = (state:AppStateType) => {
    return {
        posts:state.profilePage.posts,
        newPostText:state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        addPost:() =>{
            dispatch(addPostActionCreator());},
        updateNewPostText:(text: string) => {
            const action = updateNewPostTextActionCreator(text);
            dispatch(action)},

    }
}


const MyPostsContainer = connect(mapStateProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;