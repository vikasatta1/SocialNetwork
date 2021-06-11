import React from 'react';
import MyPosts from "./MuPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AppActionsType, profilePageType} from '../../Redux/Store';

type ProfilePropsType = {
    profilePage: profilePageType
    dispatch: (action: AppActionsType) => void
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