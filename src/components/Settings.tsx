import React, {useLayoutEffect, useState} from 'react';
import {api,userId} from "../index";
import LoadingScreen from "./LoadingScreen";

const bells = new Map<'on' | 'off', string>([
    ['off','/images/bellMute.svg'],
    ['on', '/images/bell.svg']
]);

const lightSvg = new Map<0 | 1, string>([
    [0, '/images/sun.svg'],
    [1, '/images/moon.svg']
]);

interface INotifications{
    duty:'on'|'off'
    replacement:'on'|'off'
    schedule:'on'|'off'
}

interface ITheme{
    lightMode:0|1
}


const Settings = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [notifications, setNotifications] = useState<INotifications>({
        duty:'on',
        replacement:'on',
        schedule:'on'
    })
    const [theme, setTheme] = useState<ITheme>({
        lightMode:0
    })

    const load = async () => {
        const response = await fetch(`${api}/settings/notifications/table?user=${userId}`)
        const response2 = await fetch(`${api}/settings/theme/table?user=${userId}`)
        const data:INotifications = await response.json()
        const data2:ITheme = await response2.json()
        setNotifications(data)
        setTheme(data2)
    }

    const updateBackground = async () => {
        const response = await fetch(`${api}/gradient?user=${userId}`);
        if (!response.ok) return new Error('Network response was not ok');
        const data = await response.json();
        document.body.style.backgroundImage = data.gradient;
    };

    async function updateSettingsNotificationSchedule() {
        await fetch(`${api}/settings/notifications/schedule?user=${userId}`)
        setNotifications({
            schedule: notifications.schedule === 'on' ? 'off':'on',
            duty: notifications.duty,
            replacement: notifications.replacement
        })
    }

    async function updateSettingsNotificationReplacement() {
        await fetch(`${api}/settings/notifications/replacement?user=${userId}`)
        setNotifications({
            schedule: notifications.schedule,
            duty: notifications.duty,
            replacement: notifications.replacement === 'on' ? 'off':'on'
        })
    }

    async function updateSettingsNotificationDuty() {
        await fetch(`${api}/settings/notifications/duty?user=${userId}`)
        setNotifications({
            schedule: notifications.schedule,
            duty: notifications.duty === 'on' ? 'off':'on',
            replacement: notifications.replacement
        })
    }

    async function updateSettingsThemeLightMode() {
        await fetch(`${api}/settings/theme/lightMode?user=${userId}`, {method: 'POST'})
        await updateBackground()
        setTheme({
            lightMode: theme.lightMode === 0 ? 1 : 0
        })
    }

    async function updateSettingsThemeCustom() {
        const inputElement = document.querySelector("input") as HTMLInputElement | null;
        const url = inputElement ? inputElement.value : 'standard'
        await fetch(`${api}/settings/theme/background?user=${userId}&url=${url}`, {method: 'POST'})
        await updateBackground()
    }

    async function updateSettingsThemeStandard() {
        const url = 'standard'
        await fetch(`${api}/settings/theme/background?user=${userId}&url=${url}`, {method: 'POST'})
        await updateBackground()
    }

    useLayoutEffect(() => {
        load().then(()=>setIsRendered(true))
    }, []);

    if(!isRendered){
        return (<LoadingScreen/>)
    }
    return (
<div>
    <table>
        <tbody>
        <tr className="line"></tr>
        <tr>
            <td className="title"><b>Настройки</b></td>
        </tr>
        </tbody>
    </table>
    <div id="settingsNotification">
        <table>
            <tbody>
            <tr className="fiveHeight">
                <td colSpan={2}><b className="profileB">Настройки уведомлений</b></td>
            </tr>
            <tr className="fiveHeight">
                <td><b className="profileB">Появление нового расписания:</b></td>
                <td className='minWidthTen'>
                    <button onClick={updateSettingsNotificationSchedule}>
                        <img src={bells.get(notifications.schedule)} alt="bell" className="fiveWidth"/>
                    </button>
                </td>
            </tr>
            <tr className="fiveHeight">
                <td><b className="profileB">Появление новых замен:</b></td>
                <td className='minWidthTen'>
                    <button onClick={updateSettingsNotificationReplacement}>
                        <img src={bells.get(notifications.replacement)} alt="bell" className="fiveWidth"/>
                    </button>
                </td>
            </tr>
            <tr className="fiveHeight">
            <td><b className="profileB">Рассылка таблицы дежурных за неделю:</b></td>
                <td className='minWidthTen'>
                    <button onClick={updateSettingsNotificationDuty}>
                        <img src={bells.get(notifications.duty)} alt="bell" className="fiveWidth"/>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div id="settingsTheme">
        <table>
            <tbody>
            <tr className="fiveHeight">
                <td colSpan={4}><b className="profileB">Настройки темы</b></td>
            </tr>
            <tr className="fiveHeight">
                <td colSpan={2}><b className="profileB">Темная тема:</b></td>
                <td colSpan={2}>
                    <button className='widthHundred' onClick={updateSettingsThemeLightMode}>
                        <img src={lightSvg.get(theme?.lightMode ?? 0)} alt="lightMode" className="fiveWidth"/>
                    </button>
                </td>
            </tr>
            <tr className="fiveHeight">
            <td><b className="profileB">Фон:</b></td>
                <td>
                    <b className="profileB">
                        <form name="myForm" className='form'>
                            <img src="/images/pen.svg" alt="pen" className='pen'/>
                            <span>
                                <input className="inputP" type="url" id="theme" name="theme" required/>
                            </span>
                        </form>
                    </b>
                </td>
                <td>
                    <button onClick={updateSettingsThemeCustom}>
                        <img src="/images/drive.svg" alt="drive" className='fiveWidth'/>
                    </button>
                </td>
                <td>
                    <button onClick={updateSettingsThemeStandard}>
                        <img src="/images/return.svg" alt="return" className='fiveWidth'/>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
    );
};

export default Settings;