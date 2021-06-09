import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";

type MyPostPropsType = {
    posts: Array<PostsPropsType>
    addPost: () => void
    updateNewPostText:(newText:string) => void
    newPostText:string
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
            //alert(newPostElement.current.value); /// тут надо написать чтоб посты добавлялись
            const text = newPostElement.current.value;
            props.addPost();
            props.updateNewPostText(' ')
        }
    };

    const onPostChange = () => {
        if (newPostElement.current !== null) {
            //alert(newPostElement.current.value); /// тут надо написать чтоб посты добавлялись
            const text = newPostElement.current.value;
            props.updateNewPostText(text);
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