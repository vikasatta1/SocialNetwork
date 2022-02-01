import {ContactType, ProfileType} from "../../../Redux/profile-reducer";
import React from "react";
import TextArea, {createField, Input} from "../../common/FormsControl/FormsControl";
import {Contact} from "./ProfileInfo";
import {reduxForm} from "redux-form";

type ProfileDataFormPropsType = {
    profile: ProfileType

}
const ProfileDataForm: React.FC<any> = ({profile,handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
             <div>
                <button >save</button>
            </div>
            <div>
                <b>Full name:</b>{createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b>
                {createField('','lookingForAJob',[],Input,{type:'checkbox'})}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b>{profile.lookingForAJobDescription}
                {createField('My professional skills','lookingForAJobDescription',[],TextArea)}
            </div>}
            <div>
                <b> About Me:</b>{profile.aboutMe}
                {createField('About Me','aboutMe',[],TextArea)}
            </div>
            <div>
                <b> Contacts:</b>{Object.keys(profile.contacts).map(key => {

                return <Contact key={key} contactTitle={key}
                                contactValue={profile.contacts[key as keyof ContactType]}/>
            })}
            </div>
        </form>)
}
const ProfileDataFormReduxForm = reduxForm<ProfileType>({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;