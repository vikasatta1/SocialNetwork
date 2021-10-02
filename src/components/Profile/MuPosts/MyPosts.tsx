import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import TextArea from "../../common/FormsControl/FormsControl";
type MyPostPropsType = {
    posts: Array<PostsPropsType>

    addPost: (newPostText:string) => void
}
export type PostsPropsType = {
    id: number
    message: string
    likesCount: number
}
type FormDataType = {
    newPostText:string
}
const maxLength = maxLengthCreator(10)
const addNewPostForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field
                    name={'newPostText'}
                    component={TextArea} placeholder={'Post message'}
                    validate={[required, maxLength]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>

        </form>
    )
}
const AddPostFormRedux = reduxForm<FormDataType>({
    form: "ProfileAddNewPostForm"})(addNewPostForm)

const MyPosts = (props: MyPostPropsType) => {
    const postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
    const newPostElement = React.createRef<HTMLTextAreaElement>();
    let onAddPost = (values:any) => {
        if (newPostElement.current !== null) {
            props.addPost(values.newPostText);
        }
    };

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}


export default MyPosts;