import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/user.png";
type ProfileInfoType = {
    profile:ProfileType | null
    status:string
    updateStatus:(status:string) => void
}

const ProfileInfo = (props:ProfileInfoType) => {
    if (!props.profile ){
        return <Preloader/>
    }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
               < ProfileStatusWithHooks
                   status={props.status}
                   updateStatus={props.updateStatus}
               />
            </div>
        </div>
    );
}
export default ProfileInfo;