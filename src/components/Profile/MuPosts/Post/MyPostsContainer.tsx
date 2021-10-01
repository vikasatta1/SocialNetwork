import React from 'react';
import MyPosts from "../MyPosts";
import {
    addPostActionCreator,
}
    from "../../../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/reduxe-store";
import {Dispatch} from "redux";


type mapDispatchToPropsType = {
    addPost:(newPostText:string) => void
}
const mapStateProps = (state:AppStateType) => {
    return {
        posts:state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch:Dispatch):mapDispatchToPropsType => {
    return {
        addPost:(newPostText:string) =>{
            dispatch(addPostActionCreator(newPostText));},
    }
}


const MyPostsContainer = connect(mapStateProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;