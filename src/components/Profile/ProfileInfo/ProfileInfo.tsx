import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ContactType, ProfileType} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/user.png";

type ProfileInfoType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }

    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                <ProfileData profile={props.profile}/>
                < ProfileStatusWithHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                />
            </div>
        </div>
    );
}
type ContactsPropsType = {
    contactTitle: string,
    contactValue: string
}

type ProfileDataPropsType = {
    profile: ProfileType
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, }) => {

    return (
        <div>
            <div>
                <b>Full name:</b>{profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b>{profile.lookingForAJob ? 'yes' : 'No'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b>{profile.lookingForAJobDescription}
            </div>}
            <div>
                <b> About Me:</b>{profile.aboutMe}
            </div>
            <div>
                <b> Contacts:</b>{Object.keys(profile.contacts).map(key => {

                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactType]}/>
            })}
            </div>
        </div>)
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}</b>:{contactValue}
    </div>
}

export default ProfileInfo;