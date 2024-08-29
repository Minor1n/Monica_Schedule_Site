import './styles/main.css'
import React, {useLayoutEffect, useState} from "react";
import {api, userId} from "./index";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Duty from "./components/Duty";
import LoadingScreen from "./components/LoadingScreen";
import Replacement from "./components/Replacement";


const App = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [homeS, setHomeS] = useState('visible')
    const [dutyS, setDutyS] = useState('hidden')
    const [profileS, setProfileS] = useState('hidden')
    const [settingsS, setSettingsS] = useState('hidden')
    const [replacementS, setReplacementS] = useState('hidden')

    const load = async ()=>{
        const response = await fetch(`${api}/gradient?user=${userId}`)
        const data:{gradient:string} = await response.json()
        document.body.style.backgroundImage = data.gradient;
    }

    const profile = async () => {
        setHomeS('hidden')
        setDutyS('hidden')
        setSettingsS('hidden')
        setReplacementS('hidden')
        setProfileS('visible')
    };
    const home = () => {
        setDutyS('hidden')
        setSettingsS('hidden')
        setProfileS('hidden')
        setReplacementS('hidden')
        setHomeS('visible')
    };
    const settings = async () => {
        setHomeS('hidden')
        setDutyS('hidden')
        setProfileS('hidden')
        setReplacementS('hidden')
        setSettingsS('visible')
    };
    const duty = async () => {
        setHomeS('hidden')
        setSettingsS('hidden')
        setProfileS('hidden')
        setReplacementS('hidden')
        setDutyS('visible')
    };
    const replacement = async () => {
        setHomeS('hidden')
        setSettingsS('hidden')
        setProfileS('hidden')
        setDutyS('hidden')
        setReplacementS('visible')
    };

    useLayoutEffect(() => {
        load().then(()=> setIsRendered(true))
    }, []);
    if (!isRendered) {
        return (<LoadingScreen/>);
    }
    return (
        <div className='fill'>
            <div className={homeS}><Home/></div>
            <div className={dutyS}><Duty/></div>
            <div className={profileS}><Profile/></div>
            <div className={settingsS}><Settings/></div>
            <div className={replacementS}><Replacement/></div>
            <div className="buf"></div>
            <nav className="mobile-nav">
                <button onClick={home} className="bloc-icon">
                    <img src="/images/home.svg" alt="home"/>
                </button>
                <button onClick={replacement} className="bloc-icon">
                    <img src="/images/replacement.svg" alt="replacement"/>
                </button>
                <button onClick={duty} className="bloc-icon">
                    <img src="/images/duty.svg" alt="duty" className='widthTen'/>
                </button>
                <button onClick={profile} className="bloc-icon">
                    <img src="/images/profile.svg" alt="profile"/>
                </button>
                <button onClick={settings} className="bloc-icon">
                    <img src="/images/settings.svg" alt="home"/>
                </button>
            </nav>
        </div>
    );
}

export default App;
