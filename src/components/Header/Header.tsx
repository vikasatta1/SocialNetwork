import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css';
import {HeaderPropsType} from "./HeaderContainer";


const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src={'https://cs8.pikabu.ru/post_img/2016/02/12/5/og_og_14552628492629745.jpg'}/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login :
                    <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    );
}
export default Header;