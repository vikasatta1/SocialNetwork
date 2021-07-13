import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = (props:any) => {
    return (
        <div>
            <div>
                <img src={'https://wallpaperscave.ru/images/thumbs/wp-preview/800x500/18/04-07/tv-series-rick-and-morty-38325.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description

            </div>
        </div>

    );
}
export default ProfileInfo;