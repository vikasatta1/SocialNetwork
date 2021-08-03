import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MuPosts/Post/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    profile:ProfileType
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>

            <MyPostsContainer  />
            <ProfileInfo profile={props.profile}/>
        </div>

    );
}
export default Profile;