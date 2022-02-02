import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MuPosts/Post/MyPostsContainer";
import {ProfileType} from "../../Redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

type ProfilePropsType = {
    profile: ProfileType | null
    status:string
    updateStatus:(status:string) => void
    isOwner:boolean
    savePhoto: (file: File) => void
    saveProfile:(formData: ProfileType) => void
}

const Profile = (props: ProfilePropsType) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         saveProfile={props.saveProfile}
            />


            <MyPostsContainer />
        </div>

    );
}
export default Profile;