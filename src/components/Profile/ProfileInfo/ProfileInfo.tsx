import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ContactType, ProfileType, savePhoto} from "../../../Redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../images/user.png";
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile:(formData: ProfileType) => void

}

const ProfileInfo = (props: ProfileInfoType) => {
    let [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }

    }
    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData)
        setEditMode(false)
    }


    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode ? <
                        // @ts-ignore
                        ProfileDataForm initialValues={props.profile } profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        debugger
                        setEditMode(true)
                    }} profile={props.profile} isOwner={props.isOwner}/>}
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
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {

    return (
        <div>
            {isOwner && <div>
                <button

                    onClick={goToEditMode}>edit
                </button>
            </div>}
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
                <b> About Me:</b>
            </div>
            <div>
                <b> Contacts:</b>{Object.keys(profile.contacts).map(key => {

                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactType]}/>
            })}
            </div>
        </div>)
}


export const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}</b>:{contactValue}
    </div>
}

export default ProfileInfo;