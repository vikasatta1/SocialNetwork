import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route,} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

import {RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/reduxe-store";
import {getAuthUserDataThunkCreator} from "./Redux/auth-reducer";
import {compose} from "redux";
import {getStatusThunk, getUserProfileThunkCreator, updateStatus} from "./Redux/profile-reducer";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

type OwnProps = {}
type PathParamsType = {
}
type mapStatePropsType = {
    initialized: boolean
}
type mapDispatchPropsType = {
    initializeApp: () => void
}
export type AppPropsType = mapDispatchPropsType & mapStatePropsType
type OwnPropsType = mapStatePropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType
//типизацию исправить
class App extends React.Component<any> {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if(!this.props.initialized)
        return <Preloader/>
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
    initialized:state.app.initialized
});

export default compose<React.ComponentType>(
    connect<mapStatePropsType, mapDispatchPropsType, OwnProps, AppStateType>
    (mapStateToProps, {initializeApp}),
    withRouter)(App)