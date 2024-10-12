import React, {useLayoutEffect, useState} from 'react';
import LoadingScreen from "@components/LoadingScreen";
import INotifications from "@interfaces/INotifications";
import INotificationsFields from "@interfaces/INotificationsFields";
import axios from "@axios";

const bells = new Map<'on' | 'off', string>([
    ['off','/images/bellMute.svg'],
    ['on', '/images/bell.svg']
]);

const Notifications = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [notifications, setNotifications] = useState<INotifications>({
        duty:'on',
        replacement:'on',
        schedule:'on',
        groupReplacement:'on'
    })

    const load = async () => {
        const data = await axios.settings.notification.table()
        setNotifications(data)
    }

    const toggleNotification = async (type: keyof INotifications) => {
        await axios.settings.notification[type]()
        setNotifications(prev => ({
            ...prev,
            [type]: prev[type] === 'on' ? 'off' : 'on'
        }));
    };

    const fields: INotificationsFields[] = [
        {
            label: "Появление нового расписания",
            onClick: () => toggleNotification('schedule'),
            notificationType: notifications.schedule
        },
        {
            label: "Появление новых замен",
            onClick: () => toggleNotification('replacement'),
            notificationType: notifications.replacement
        },
        {
            label: "Замены для группы",
            onClick: () => toggleNotification('groupReplacement'),
            notificationType: notifications.groupReplacement
        },
        {
            label: "Рассылка таблицы дежурных за неделю",
            onClick: () => toggleNotification('duty'),
            notificationType: notifications.duty
        },
    ];

    useLayoutEffect(() => {
        load().then(()=>setIsRendered(true))
    }, []);

    if(!isRendered){
        return (<LoadingScreen/>)
    }
    return (
<div id="settingsNotification">
    <table>
        <tbody>
        <tr className="fiveHeight">
            <td colSpan={2}><b className="profileB">Настройки уведомлений</b></td>
        </tr>
        {
            fields.map((item, index) =>
                <tr className="fiveHeight" key={index}>
                    <td><b className="profileB">{item.label}:</b></td>
                    <td className="minWidthTen">
                        <button onClick={item.onClick}>
                            <img src={bells.get(item.notificationType)} alt="bell" className="fiveWidth"/>
                        </button>
                    </td>
                </tr>
            )
        }
        </tbody>
    </table>
</div>
    );
};

export default Notifications;