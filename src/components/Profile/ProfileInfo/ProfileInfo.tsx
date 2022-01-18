import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/user.png";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }
 const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
     if (e.target.files && e.target.files.length) {
         props.savePhoto(e.target.files[0]);
     }

}

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                < ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    );
}
export default ProfileInfo;