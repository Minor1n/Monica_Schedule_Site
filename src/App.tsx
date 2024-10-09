import '@styles/main.css'
import React, {useLayoutEffect, useState} from "react";
import {api, userId} from "@index";
import MainHome from "@components/home/MainHome";
import MainDuty from "@components/duty/MainDuty";
import MainReplacement from "@components/replacements/MainReplacement";
import MainOther from "@components/other/MainOther";
import MainProfile from "@components/profile/MainProfile";
import MainSettings from "@components/settings/MainSettings";
import LoadingScreen from "@components/LoadingScreen";
import Navigation from "@components/Navigation";
import Buffer from "@components/Buffer";

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
            <div className={visibleSection === 'home' ? 'visible' : 'hidden'}><MainHome/></div>
            <div className={visibleSection === 'replacement' ? 'visible' : 'hidden'}><MainReplacement/></div>
            <div className={visibleSection === 'duty' ? 'visible' : 'hidden'}><MainDuty/></div>
            <div className={visibleSection === 'profile' ? 'visible' : 'hidden'}><MainProfile/></div>
            <div className={visibleSection === 'settings' ? 'visible' : 'hidden'}><MainSettings/></div>
            <div className={visibleSection === 'other' ? 'visible' : 'hidden'}><MainOther/></div>
            <Buffer/>
            <Navigation>
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
            </Navigation>
        </div>
    );
}

export default App;
