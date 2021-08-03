import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MuPosts/Post/MyPostsContainer";

type ProfilePropsType = {
}

const Profile = (props: any) => {

    return (
        <div>
            <ProfileInfo profile={props.props}/>
            <MyPostsContainer  />
        </div>

    );
}
export default Profile;