import {ContactType, ProfileType} from "../../../Redux/profile-reducer";
import React from "react";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {Contact} from "./ProfileInfo";
import {reduxForm} from "redux-form";

type ProfileDataFormPropsType = {
    profile: ProfileType

}
const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({profile}) => {
    return (
        <form>
             <div>
                <button onClick={()=>{}}>save</button>
            </div>
            <div>
                <b>Full name:</b>{createField("Full name", "fullName", [], Input)}
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
        </form>)
}
const ProfileDataFormReduxForm = reduxForm({form:''})(ProfileDataForm)
export default ProfileDataForm;