import '@styles/main.css'
import React, {useLayoutEffect, useState} from "react";
import MainHome from "@components/home/MainHome";
import MainDuty from "@components/duty/MainDuty";
import MainReplacement from "@components/replacements/MainReplacement";
import MainOther from "@components/other/MainOther";
import MainProfile from "@components/profile/MainProfile";
import MainSettings from "@components/settings/MainSettings";
import MainGames from "@components/games/MainGames";
import Burger from "@components/Burger";
import Navigation from "@components/Navigation";
import NavigationButton from "@components/NavigationButton";
import LoadingScreen from "@components/LoadingScreen";
import Buffer from "@components/Buffer";
import axios from "@axios";
import Header from "@components/Header";
import '@styles/header.css'
import '@styles/fonts.css'

type VisibleSection = 'home'|'replacement'|'duty'|'other'|'profile'|'settings'|'games'|'burger'

const App = () => {
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [visibleSection, setVisibleSection] = useState<VisibleSection>('home');
    const [visibleBurger, setVisibleBurger] = useState<true|false>(false)
    const [paymentStatus, setPaymentStatus] = useState<number>(0)

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
        setVisibleBurger(false)
    };

    const showBurger = (status:true|false) => {
        setVisibleBurger(status)
    }

    const load = async ()=>{
        const data = await axios.settings.theme.table()
        document.body.style.backgroundImage = `url("/images/background-${data.lightMode===1?'dark':'light'}.jpg")`;
        const payment = await axios.paymentStatus()
        if(payment.status === 0) {
            setVisibleSection('duty')
        }
        setPaymentStatus(payment.status)
    }

    useLayoutEffect(() => {
        load().then(()=> setIsRendered(true))
    }, []);

    if (!isRendered) {
        return (<LoadingScreen/>);
    }
    return (
        <div className='fill'>
            <Header/>
            <div className='header-buffer'/>
            {paymentStatus !== 0 && (
                <>
                    <div className={visibleSection === 'home' ? 'visible' : 'hidden'}><MainHome/></div>
                    <div className={visibleSection === 'replacement' ? 'visible' : 'hidden'}><MainReplacement/></div>
                </>
            )}
            <div className={visibleSection === 'duty' ? 'visible' : 'hidden'}><MainDuty/></div>
            <div className={visibleSection === 'profile' ? 'visible' : 'hidden'}><MainProfile/></div>
            <div className={visibleSection === 'settings' ? 'visible' : 'hidden'}><MainSettings/></div>
            <div className={visibleSection === 'other' ? 'visible' : 'hidden'}><MainOther/></div>
            <div className={visibleSection === 'games' ? 'visible' : 'hidden'}><MainGames/></div>
            <div>
                <Burger className={`${visibleBurger ? 'burger-slide-up' : ''}`} length={3}>
                    <NavigationButton src='/images/profile.svg' alt='profile' padding={6} onClick={() => {
                        showSection('profile');
                    }}/>
                    <NavigationButton src='/images/gamepad.svg' alt='games' padding={6} onClick={() => {
                        showSection('games');
                    }}/>
                    <NavigationButton src='/images/threeDots.svg' alt='other' padding={6} onClick={() => {
                        showSection('other');
                    }}/>
                </Burger>
            </div>
            <Buffer/>
            <Navigation>
                {paymentStatus !== 0 && (
                    <>
                        <NavigationButton src='/images/home.svg' alt='home' padding={2} onClick={() => {
                            showSection('home')
                        }}/>
                        <NavigationButton src='/images/replacement.svg' alt='replacement' padding={2} onClick={() => {
                            showSection('replacement')
                        }}/>
                    </>
                )}
                <NavigationButton className='widthTen' src='/images/duty.svg' alt='duty' padding={2} onClick={() => {
                    showSection('duty')
                }}/>
                <NavigationButton src='/images/settings.svg' alt='settings' padding={2} onClick={() => {
                    showSection('settings')
                }}/>
                <NavigationButton src='/images/burger.svg' alt='burger' padding={2} onClick={() => {
                    showBurger(!visibleBurger)
                }}/>
            </Navigation>
        </div>
    );
}

export default App;
