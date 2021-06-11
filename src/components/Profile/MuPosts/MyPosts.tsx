import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {
    addPostActionCreator,
    AddPostActionType,
    ChangeNewPostTextActionType,
    updateNewPostTextActionCreator
} from "../../../Redux/profile-reducer";


type MyPostPropsType = {
    posts: Array<PostsPropsType>
    newPostText: string
    dispatch: (action: AddPostActionType | ChangeNewPostTextActionType) => void
}

export type PostsPropsType = {
    id: number
    message: string
    likesCount: number
}

type Message = {
    message: string
    addPostCallBack: (postMessage: string) => void
}



const MyPosts = (props: MyPostPropsType) => {
    const postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    const newPostElement = React.createRef<HTMLTextAreaElement>();
    const addPost = () => {
        if (newPostElement.current !== null) {
            const text = newPostElement.current.value;
            props.dispatch(addPostActionCreator(props.newPostText));
        }
    };
    const onPostChange = () => {
        if (newPostElement.current !== null) {
            const text = newPostElement.current.value;
            const action = updateNewPostTextActionCreator(text);
            props.dispatch(action)
        }
    };
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>

            </div>
            <div className={s.posts}>
                {postsElements}


            </div>
        </div>

    );
}
export default MyPosts;