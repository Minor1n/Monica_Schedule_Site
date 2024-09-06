import './styles/main.css'
import React, {useLayoutEffect, useState} from "react";
import {api, userId} from "./index";
import Home from "./components/Home";
import Duty from "./components/Duty";
import LoadingScreen from "./components/LoadingScreen";
import Replacement from "./components/Replacement";
import Other from "./components/Other";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

type VisibleSection = 'home'|'replacement'|'duty'|'other'|'profile'|'settings'


const App = () => {
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [visibleSection, setVisibleSection] = useState<VisibleSection>('home');

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
    };

    const load = async ()=>{
        const response = await fetch(`${api}/gradient?user=${userId}`)
        const data:{gradient:string} = await response.json()
        document.body.style.backgroundImage = data.gradient;
    }

    useLayoutEffect(() => {
        load().then(()=> setIsRendered(true))
    }, []);

    if (!isRendered) {
        return (<LoadingScreen/>);
    }
    return (
        <div className='fill'>
            <div className={visibleSection === 'home' ? 'visible' : 'hidden'}><Home/></div>
            <div className={visibleSection === 'replacement' ? 'visible' : 'hidden'}><Replacement/></div>
            <div className={visibleSection === 'duty' ? 'visible' : 'hidden'}><Duty/></div>
            <div className={visibleSection === 'profile' ? 'visible' : 'hidden'}><Profile/></div>
            <div className={visibleSection === 'settings' ? 'visible' : 'hidden'}><Settings/></div>
            <div className={visibleSection === 'other' ? 'visible' : 'hidden'}><Other/></div>
            <div className="buf"></div>
            <nav className="mobile-nav">
                <button onClick={() => showSection('home')} className="bloc-icon">
                    <img src="/images/home.svg" alt="home"/>
                </button>
                <button onClick={() => showSection('replacement')} className="bloc-icon">
                    <img src="/images/replacement.svg" alt="replacement"/>
                </button>
                <button onClick={() => showSection('duty')} className="bloc-icon">
                    <img src="/images/duty.svg" alt="duty" className='widthTen'/>
                </button>
                <button onClick={() => showSection('profile')} className="bloc-icon">
                    <img src="/images/profile.svg" alt="profile"/>
                </button>
                <button onClick={() => showSection('settings')} className="bloc-icon">
                    <img src="/images/settings.svg" alt="settings"/>
                </button>
                <button onClick={() => showSection('other')} className="bloc-icon">
                    <img src="/images/burger.svg" alt="other"/>
                </button>
            </nav>
        </div>
    );
}

export default App;
