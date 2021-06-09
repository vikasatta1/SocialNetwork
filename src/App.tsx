import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route,} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import store, {AddPostActionType, ChangeNewPostTextActionType, StatePropsType, StoreType} from "./Redux/State";

export  type AppType = {
    dispatch: (action: AddPostActionType|ChangeNewPostTextActionType) => void
    //addPost: () => void
    //updateNewPostText: (newText: string) => void
    store: StoreType
}
const App:React.FC<AppType> = (props ) => {
    // const state = props.store.getState;
    return (

        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <Dialogs
                    store={props.store}/>}/>




                <Route path='/profile' render={() => <Profile
                    profilePage={props.store._state.profilePage}
                    newPostText={props.store._state.profilePage.newPostText}
                    dispatch = {props.dispatch}
                />}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    )
}


export default App;
