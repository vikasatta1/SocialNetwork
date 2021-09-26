import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props:any) => {
    if (!props.profile ){
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>
                <img src={'https://wallpaperscave.ru/images/thumbs/wp-preview/800x500/18/04-07/tv-series-rick-and-morty-38325.jpg'}/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
               <ProfileStatus status={"Hello my friends"} />


            </div>
        </div>

    );
}
export default ProfileInfo;