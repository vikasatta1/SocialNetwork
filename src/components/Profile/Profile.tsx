import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {AppActionsType, profilePageType, StoreType} from '../../Redux/Store';
import MyPostsContainer from "./MuPosts/Post/MyPostsContainer";

type ProfilePropsType = {
    /*store: StoreType*/
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer  />
        </div>

    );
}
export default Profile;