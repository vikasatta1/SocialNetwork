import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import TextArea from "../../common/FormsControl/FormsControl";

import {RouteComponentProps} from "react-router";

export type PostsPropsType = {
    id: number
    message: string
    likesCount: number
}
type FormDataType = {
    newPostText:string
}
const maxLength = maxLengthCreator(10)
type PathParamsType = {

}
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type mapStatePropsType = {
    posts: Array<PostsPropsType>
    addPost: (newPostText:string) => void
}
type mapDispatchPropsType = {

}
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
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

class MyPosts extends React.Component<PropsType> {
shouldComponentUpdate(nextProps: Readonly<PropsType>, nextState: Readonly<{}>, nextContext: any): boolean {
    return nextProps != this.props && nextState != this.state;
}

    render() {
        const postsElements =
            this.props.posts.map((p: { message: string; likesCount: number; }) => <Post message={p.message} likesCount={p.likesCount}/>)
        const newPostElement = React.createRef<HTMLTextAreaElement>();
        let onAddPost = (values:any) => {
            if (newPostElement.current !== null) {
                this.props.addPost(values.newPostText);
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


}


export default MyPosts;