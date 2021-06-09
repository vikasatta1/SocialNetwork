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
import {StatePropsType, updateNewPostText} from "./Redux/State";


type AppPropsType = {
    state: StatePropsType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}
const App = (props: AppPropsType) => {
    return (

        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => <Dialogs
                    dialogsPage={props.state.dialogsPage}/>}/>
                <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}
                                                              updateNewPostText={props.updateNewPostText}
                                                              newPostText={props.state.profilePage.newPostText}
                                                              addPost={props.addPost}/>}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
            </div>
        </div>
    )
}


export default App;
