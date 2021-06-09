import React from 'react';
import MyPosts from "./MuPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AddPostActionType, ChangeNewPostTextActionType, profilePageType} from '../../Redux/State';

type ProfilePropsType = {
    profilePage: profilePageType
    dispatch: (action: AddPostActionType | ChangeNewPostTextActionType) => void
    newPostText: string

}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>

    );
}
export default Profile;