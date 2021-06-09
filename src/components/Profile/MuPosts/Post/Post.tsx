import React from 'react';
import s from './Post.module.css';

type PostPropsType = {
    message: string
    likesCount: number
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <img src='https://i.pinimg.com/originals/9c/77/46/9c7746225873e02d83b9315501b8dd2f.jpg'/>
            {props.message}
            <div>
            <span>like</span>
                {props.likesCount}
            </div>
        </div>
    )
}
export default Post;