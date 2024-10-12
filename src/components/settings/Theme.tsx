import React, {useLayoutEffect, useState} from 'react';
import LoadingScreen from "@components/LoadingScreen";
import ITheme from "@interfaces/ITheme";
import axios from "@axios";

const lightSvg = new Map<0 | 1, string>([
    [0, '/images/sun.svg'],
    [1, '/images/moon.svg']
]);

const Theme = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [theme, setTheme] = useState<ITheme>({
        lightMode:0
    })

    const updateBackground = async () => {
        const data = await axios.gradient()
        document.body.style.backgroundImage = data.gradient;
    };

    const updateTheme = async (url: string) => {
        await axios.settings.theme.background(url)
        await updateBackground();
    };

    const toggleLightMode = async () => {
        await axios.settings.theme.lightMode()
        setTheme(prev => ({ lightMode: prev.lightMode === 0 ? 1 : 0 }));
        await updateBackground();
    };


    const load = async () => {
        const data = await axios.settings.theme.table()
        setTheme(data)
    }

    const buttons = [
        {
            onClick: ()=> updateTheme((document.getElementById('theme') as HTMLSelectElement)?.value || 'standard'),
            icon: "/images/drive.svg",
            alt: "drive"
        },
        {
            onClick: ()=> updateTheme('standard'),
            icon: "/images/return.svg",
            alt: "return"
        }
    ]

    useLayoutEffect(() => {
        load().then(()=>setIsRendered(true))
    }, []);

    if(!isRendered){
        return (<LoadingScreen/>)
    }
    return (
<div id="settingsTheme">
    <table>
        <tbody>
        <tr className="fiveHeight">
            <td colSpan={4}><b className="profileB">Настройки темы</b></td>
        </tr>
        <tr className="fiveHeight">
            <td colSpan={2}><b className="profileB">Темная тема:</b></td>
            <td colSpan={2}>
                <button className="widthHundred" onClick={toggleLightMode}>
                    <img src={lightSvg.get(theme?.lightMode ?? 0)} alt="lightMode"
                         className="fiveWidth"/>
                </button>
            </td>
        </tr>
        <tr className="fiveHeight">
            <td><b className="profileB">Фон:</b></td>
            <td>
                <b className="profileB">
                    <form name="myForm" className="form">
                        <img src="/images/pen.svg" alt="pen" className="pen"/>
                        <span>
                            <input className="inputP" type="url" id="theme" name="theme" required/>
                        </span>
                    </form>
                </b>
            </td>
            {buttons.map((btn, index) => (
                <td key={index}>
                    <button onClick={btn.onClick}>
                        <img src={btn.icon} alt={btn.alt} className="fiveWidth"/>
                    </button>
                </td>
            ))}
        </tr>
        </tbody>
    </table>
</div>
    );
};

export default Theme;