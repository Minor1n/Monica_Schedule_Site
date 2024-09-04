import React, {useLayoutEffect, useState} from 'react';
import {api,userId} from "../index";
import LoadingScreen from "./LoadingScreen";

interface IUser{
    name:string
    groupName:string
    duty:string
    payment:string
    refKey:string
    refBonus:string
    paymentAmount:string
    groupOptions:string
    dutyDayOptions:string
}

const TableRow: React.FC<{ label: string; value: React.ReactNode; children?: React.ReactNode }> = ({ label, value, children }) => (
    <tr className="fiveHeight">
        <td><b className="profileB">{label}</b></td>
        <td><b className="profileB">{value}</b></td>
        {children && <td><b className="profileB">{children}</b></td>}
    </tr>
);


const Profile = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [user, setUser] = useState<IUser>();

    const setUserF = async ():Promise<void> =>{
        const response = await fetch(`${api}/profile/info/table?user=${userId}`)
        const data:IUser = await response.json()
        setUser(data)
    }

    const update = async (e: React.KeyboardEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const group = (document.getElementById('selectGroup') as HTMLSelectElement).value;
        const dutyDay = (document.getElementById('selectDutyDay') as HTMLSelectElement).value;
        const name = (document.getElementById('nameUpdate') as HTMLInputElement).value.trim();
        const refKey = (document.getElementById('refKey') as HTMLInputElement).value.trim();
        const monthPay = (document.getElementById('monthPay') as HTMLInputElement).value.trim();

        console.log(group, dutyDay, name, refKey, monthPay)

        const requests = [
            fetch(`${api}/profile/settings/dutyDay?user=${userId}&day=${dutyDay}`),
            fetch(`${api}/profile/settings/group?user=${userId}&group=${group}`),
            name && fetch(`${api}/profile/settings/name?user=${userId}&name=${name}`),
            monthPay && fetch(`${api}/profile/info/monthPay?user=${userId}&months=${monthPay}`)
                .then(res => res.json())
                .then(data => alert(data.alert)),
            refKey && fetch(`${api}/profile/info/refKey?user=${userId}&refKey=${refKey}`)
                .then(res => res.json())
                .then(data => alert(data.alert)),
        ].filter(Boolean) as Promise<Response>[];

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
            Расчитать сумму оплаты<br/>на несколько месяцев<br/>
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

export default Profile;