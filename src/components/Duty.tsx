import React from 'react';
import {fetchAndUpdate} from "../App";
import {api} from "../index";
import TelegramWebApp from "../hooks/TelegramWebApp";

let dutyPage = 0

const Duty = () => {
    const userId = TelegramWebApp()
    function changeDutyPage(i:number) {
        if (dutyPage+i < 0) return alert(`Дежурства не найдены!`);
        const newPage = dutyPage+i
        fetchAndUpdate(`duty/table?user=${userId}&page=${newPage}`, {elementId:"duty"})
        dutyPage = newPage
    }

    async function dutyCheckIn(){
        const response = await fetch(`${api}/duty/checkin?user=${userId}`)
        const data = await response.json();
        alert(data.alert)
        await fetchAndUpdate(`duty/table?user=${userId}&page=${dutyPage}`, {elementId:"duty"})
    }
    changeDutyPage(0)
    const dutyIncrement = ()=>{
        changeDutyPage(1)
    }
    const dutyDecrement = ()=>{
        changeDutyPage(-1)
    }
    return (
        <div>
            <table>
                <tbody>
                <tr className="line"></tr>
                <tr>
                    <td>
                        <button onClick={dutyIncrement} className="arrow">
                            <img src="/images/arrowLeft.svg" alt="arrowLeft"/>
                        </button>
                    </td>
                    <td className="title"><b>Дежурства</b></td>
                    <td>
                        <button onClick={dutyDecrement} className="arrow">
                            <img src="/images/arrowRight.svg" alt="arrowRight"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="duty"></div>
            <div className="buf"></div>
            <nav className="mobile-nav dutyButton">
                <button onClick={dutyCheckIn} className="bloc-icon">
                    <b className="title">Отдежурил</b>
                </button>
            </nav>
        </div>
    );
};

export default Duty;