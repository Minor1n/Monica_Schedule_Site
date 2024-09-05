import React, {useState} from 'react';
import Calculator from "./Calculator";
import Profile from "./Profile";
import Settings from "./Settings";

type VisibleSection = 'calculator'|'profile'|'settings'

const Other = () => {
    const [visibleSection, setVisibleSection] = useState<VisibleSection>('profile');

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
    };
    return (
        <div>
            <div className={visibleSection === 'profile' ? 'visible' : 'hidden'}><Profile/></div>
            <div className={visibleSection === 'settings' ? 'visible' : 'hidden'}><Settings/></div>
            <div className={visibleSection === 'calculator' ? 'visible' : 'hidden'}><Calculator/></div>
            <div className="buf"/>
            <nav className="mobile-nav dutyButton">
                <button onClick={() => showSection('profile')} className="bloc-icon">
                    <img src="/images/profile.svg" alt="profile"/>
                </button>
                <button onClick={() => showSection('settings')} className="bloc-icon">
                    <img src="/images/settings.svg" alt="settings"/>
                </button>
                <button onClick={() => showSection('calculator')} className="bloc-icon">
                    <img src="/images/calculator.svg" alt="calculator"/>
                </button>
            </nav>
        </div>
    );
};

export default Other;