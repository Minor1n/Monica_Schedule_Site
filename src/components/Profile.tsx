import React, {useEffect, useState} from 'react';
import {userId} from "../App";
import {api} from "../index";

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


const Profile = () => {
    const [user, setUser] = useState<IUser>();
    const setUserF = async ():Promise<void> =>{
        const response = await fetch(`${api}/profile/info/table?user=${userId}`)
        const user:IUser = await response.json()
        const dutySelector = document.getElementById('selectDutyDay')
        if (dutySelector&&user) {
            dutySelector.innerHTML = user.dutyDayOptions
        }
        const groupsSelector = document.getElementById('selectGroup')
        if (groupsSelector&&user) {
            groupsSelector.innerHTML = user.groupOptions
        }
        setUser(user)
    }
    useEffect(()=> {
        setUserF()
    },[])
    const update = async () => {
        const group = (document.getElementById('selectGroup') as HTMLSelectElement).value;
        const dutyDay = (document.getElementById('selectDutyDay') as HTMLSelectElement).value;
        const name = (document.getElementById('nameUpdate') as HTMLInputElement).value.trim();
        const refKey = (document.getElementById('refKey') as HTMLInputElement).value.trim();
        const monthPay = (document.getElementById('monthPay') as HTMLInputElement).value.trim();

        console.log(group, dutyDay, name, refKey, monthPay)

        const requests: Promise<Response | void>[] = [
            fetch(`${api}/profile/settings/dutyDay?user=${userId}&day=${dutyDay}`),
            fetch(`${api}/profile/settings/group?user=${userId}&group=${group}`)
        ];

        if (name) {
            requests.push(fetch(`${api}/profile/settings/name?user=${userId}&name=${name}`));
        }

        if (monthPay) {
            requests.push(
                fetch(`${api}/profile/info/monthPay?user=${userId}&months=${monthPay}`)
                    .then(res => res.json())
                    .then(data => alert(data.alert))
            );
        }

        if (refKey) {
            requests.push(
                fetch(`${api}/profile/info/refKey?user=${userId}&refKey=${refKey}`)
                    .then(res => res.json())
                    .then(data => alert(data.alert))
            );
        }

        await Promise.all(requests);
        await setUserF()
    };

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
                <tr className="fiveHeight">
                    <td><b className="profileB">Группа:</b></td>
                    <td><b className="profileB">{user?.groupName}</b></td>
                    <td>
                        <b className="profileB">
                            <form name="myForm" className='form'>
                                <img src="/images/pen.svg" alt="pen" className='pen'/>
                                <span>
                            <select name="selectGroup" id="selectGroup"></select>
                        </span>
                            </form>
                        </b>
                    </td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Имя:</b></td>
                    <td><b className="profileB">{user?.name}</b></td>
                    <td>
                        <b className="profileB">
                            <form name="myForm1" className='form'>
                                <img src="/images/pen.svg" alt="pen" className='pen'/>
                                <span>
                                    <input className="inputP" type="text" id="nameUpdate" name="nameUpdate" required/>
                                </span>
                            </form>
                        </b>
                    </td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">День дежурства:</b></td>
                    <td><b className="profileB">{user?.duty}</b></td>
                    <td>
                        <b className="profileB">
                            <form name="myForm1" className='form'>
                                <img src="/images/pen.svg" alt="pen" className='pen'/>
                                <span>
                            <select name="selectDutyDay" id="selectDutyDay"></select>
                        </span>
                            </form>
                        </b>
                    </td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Телеграм id:</b></td>
                    <td><b className="profileB">{userId}</b></td>
                    <td><b className="profileB"><i>Указывайте в комментарии платежа</i></b></td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Статус оплаты:</b></td>
                    <td><b className="profileB">{user?.payment}</b></td>
                    <td>
                        <b className="profileB">
                            Расчитать сумму оплаты<br/>на несколько месяцев<br/>
                            <form name="myForm1" className='form'>
                                <img src="/images/pen.svg" alt="pen" className='pen'/>
                                <span>
                        <input type="text" id="monthPay" name="monthPay" required/>
                        </span>
                            </form>
                        </b>
                    </td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Сумма оплаты с учетом рефералки:</b></td>
                    <td><b className="profileB">{user?.paymentAmount}р</b></td>
                    <td><b className="profileB">
                        <a href="https://www.tinkoff.ru/rm/korop.aleksandr4/KHtiD43274">Перейти на страницу оплаты</a>
                    </b></td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Реферальный ключ:</b></td>
                    <td><b className="profileB">{user?.refKey}</b></td>
                    <td>
                        <b className="profileB">
                            <form name="myForm3" className='form'>
                                <img src="/images/pen.svg" alt="pen" className='pen'/>
                                <span>
                        <input className="inputP" type="text" id="refKey" name="refKey" required/>
                    </span>
                            </form>
                        </b>
                    </td>
                </tr>

                <tr className="fiveHeight">
                    <td><b className="profileB">Бонус рефералов:</b></td>
                    <td><b className="profileB">{user?.refBonus}%</b></td>
                </tr>
                <tr className="fiveHeight">
                    <td><b className="profileB">Связь с админом:</b></td>
                    <td><b className="profileB">@a_korop</b></td>
                </tr>
                <tr className="fiveHeight">
                    <td colSpan={2}></td>
                    <td>
                        <button onClick={update}>
                            <img src="/images/drive.svg" alt="drive" className='fiveWidth'/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};

export default Profile;