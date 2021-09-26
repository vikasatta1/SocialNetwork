import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MuPosts/Post/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status:string
    updateStatusThunk:(status:string) => void

}

const Profile = (props: ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateStatusThunk={props.updateStatusThunk}/>
            <MyPostsContainer/>
        </div>

    );
}
export default Profile;