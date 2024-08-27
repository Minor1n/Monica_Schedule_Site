import './styles/main.css'
import React, {useLayoutEffect, useState} from "react";
import {api, userId} from "./index";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Duty from "./components/Duty";
import LoadingScreen from "./components/LoadingScreen";


const App = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [page, setPage] = useState<React.JSX.Element>(<Home/>);

    const load = async ()=>{
        const response = await fetch(`${api}/gradient?user=${userId}`)
        const data:{gradient:string} = await response.json()
        document.body.style.backgroundImage = data.gradient;
    }

    const profile = async () => {
        setPage(<Profile/>)
    };
    const home = () => {
        setPage(<Home/>)
    };
    const settings = async () => {
        setPage(<Settings/>)
    };
    const duty = async () => {
        setPage(<Duty/>)
    };

    useLayoutEffect(() => {
        load().then(()=> setIsRendered(true))
    }, []);
    if (!isRendered) {
        return (<LoadingScreen/>);
    }
    return (
        <div className='fill'>
            {page}
            <div className="buf"></div>
            <nav className="mobile-nav">
                <button onClick={home} className="bloc-icon">
                    <img src="/images/home.svg" alt="home"/>
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
