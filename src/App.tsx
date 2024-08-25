import './styles/main.css'
import {api, userId} from "./index";
import Home from "./components/Home";
import Profile from "./components/Profile";
import React, {useEffect, useState} from "react";
import Settings from "./components/Settings";
import Duty from "./components/Duty";


export const fetchAndUpdate = async (url: string, options?:{elementId?: string, page?: string}) => {
    try {
        const response = await fetch(`${api}/${url}`);
        if (!response.ok) return new Error('Network response was not ok');
        const data = await response.json();

        if (options?.elementId) {
            const element = document.getElementById(options.elementId);
            if (element) {
                element.innerHTML = `<table>${data.table}</table>`;
            }
        } else {
            document.body.innerHTML = data.body;
        }
    } catch (error) {
        console.error(`Ошибка при обновлении данных для ${url}:`, error);
    }
};

function App() {
    const updateBackground = async () => {
        try {
            const response = await fetch(`${api}/gradient?user=${userId}`);
            if (!response.ok) return new Error('Network response was not ok');
            const data = await response.json();
            document.body.style.backgroundImage = data.gradient;
        } catch (error) {
            console.error('Ошибка при обновлении фона:', error);
        }
    };
    useEffect(()=>{
        updateBackground()
    },[])
    const [page, setPage] = useState<JSX.Element>(<Home/>);
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
