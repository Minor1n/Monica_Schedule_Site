import React, {useLayoutEffect, useState} from 'react';
import {userId} from "@index";
import LoadingScreen from "@components/LoadingScreen";
import TableRow from "./TableRow";
import IUser from "@interfaces/IUser";
import axios from "@axios";

const MainProfile = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [user, setUser] = useState<IUser>();

    const setUserF = async ():Promise<void> =>{
        const data = await axios.profile.info.table()
        setUser(data)
    }

    const update = async (e: React.KeyboardEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const group = (document.getElementById('selectGroup') as HTMLSelectElement).value;
        const dutyDay = Number((document.getElementById('selectDutyDay') as HTMLSelectElement).value);
        const name = (document.getElementById('nameUpdate') as HTMLInputElement).value.trim();
        const refKey = (document.getElementById('refKey') as HTMLInputElement).value.trim();
        const monthPay = Number((document.getElementById('monthPay') as HTMLInputElement).value.trim());

        console.log(group, dutyDay, name, refKey, monthPay)

        const requests = [
            axios.profile.settings.dutyDay(dutyDay),
            axios.profile.settings.group(group),
            name && axios.profile.settings.name(name),
            monthPay && axios.profile.info.monthPay(monthPay).then(data => alert(data.alert)),
            refKey && axios.profile.info.refKey(refKey).then(data => alert(data.alert)),
        ].filter(Boolean) as unknown as Promise<Response>[];

        await Promise.all(requests);
        await setUserF()
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    useLayoutEffect(() => {
        setUserF().then(()=>setIsRendered(true))
    }, []);

    if(!isRendered||!user){
        return (<LoadingScreen/>)
    }
    return (
<div>
    <table>
        <tbody>
        <tr className="line"></tr>
        <tr>
            <td className="title"><b>Профиль</b></td>
        </tr>
        </tbody>
    </table>
    <table>
        <tbody>
        <tr className="fiveHeight">
            <td colSpan={2}><b className="profileB">Информация</b></td>
            <td><b className="profileB">Настроить</b></td>
        </tr>
        
        <TableRow label="Группа:" value={user.groupName}>
            <form className="form">
                <img src="/images/pen.svg" alt="pen" className="pen"/>
                <span>
                    <select dangerouslySetInnerHTML={{__html: String(user.groupOptions)}} name="selectGroup" id="selectGroup"/>
                </span>
            </form>
        </TableRow>

        <TableRow label="Имя:" value={user.name}>
            <form className="form">
                <img src="/images/pen.svg" alt="pen" className="pen"/>
                <span>
                    <input className="inputP" type="text" id="nameUpdate" name="nameUpdate" onKeyDown={handleKeyDown} required/>
                </span>
            </form>
        </TableRow>

        <TableRow label="День дежурства:" value={user.duty}>
            <form className="form">
                <img src="/images/pen.svg" alt="pen" className="pen"/>
                <span>
                    <select dangerouslySetInnerHTML={{__html: String(user.dutyDayOptions)}} name="selectDutyDay" id="selectDutyDay"/>
                </span>
            </form>
        </TableRow>

        <TableRow label="Телеграм id:" value={userId}>
            <i>Указывайте в комментарии платежа</i>
        </TableRow>

        <TableRow label="Статус оплаты:" value={user.payment}>
            Рассчитать сумму оплаты<br/>на несколько месяцев<br/>
            <form className="form">
                <img src="/images/pen.svg" alt="pen" className="pen"/>
                <span>
                    <input type="text" id="monthPay" name="monthPay" onKeyDown={handleKeyDown} required/>
                </span>
            </form>
        </TableRow>

        <TableRow label="Сумма оплаты с учетом рефералки:" value={`${user.paymentAmount}р`}>
            <a href="https://www.tinkoff.ru/rm/korop.aleksandr4/KHtiD43274">Перейти на страницу оплаты</a>
        </TableRow>

        <TableRow label="Реферальный ключ:" value={user.refKey}>
            <form className="form">
                <img src="/images/pen.svg" alt="pen" className="pen"/>
                <span>
                    <input className="inputP" type="text" id="refKey" name="refKey" onKeyDown={handleKeyDown} required/>
                </span>
            </form>
        </TableRow>

        <TableRow label="Бонус рефералов:" value={`${user.refBonus}%`}/>

        <TableRow label="Связь с админом:" value="@a_korop"/>

        <tr className="fiveHeight">
            <td colSpan={2}></td>
            <td>
                <button onClick={update}>
                    <img src="/images/drive.svg" alt="drive" className="fiveWidth"/>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
    )
};

export default MainProfile;