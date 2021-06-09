import React from 'react';
import MyPosts from "./MuPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {profilePageType, updateNewPostText} from '../../Redux/State';

type ProfilePropsType = {
    profilePage: profilePageType
    addPost: () => void
    updateNewPostText:(newText:string) => void
    newPostText: string
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     updateNewPostText={props.updateNewPostText}
                     addPost={props.addPost}
                     />
        </div>

    );
}
export default Profile;