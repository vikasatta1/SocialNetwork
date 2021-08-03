import React from 'react';
import s from './Header.module.css';


const Header = () => {
    return (
        <header className={s.header}>
            <img src={'https://cs8.pikabu.ru/post_img/2016/02/12/5/og_og_14552628492629745.jpg'}/>
            <div className={s.loginBlock}></div>
        </header>
    );
}
export default Header;