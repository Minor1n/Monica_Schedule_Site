import React from 'react';
import {fetchAndUpdate} from "../App";
import {api} from "../index";
import TelegramWebApp from "../hooks/TelegramWebApp";

interface ReplacementData {
    table: string;
}

let replacementPage = 0;

const changeReplacementPage = async (i: number) => {
    if (replacementPage + i < 0) return alert(`Замены не найдены!`);

    const newPage = replacementPage + i;
    try {
        const response = await fetch(`${api}/home/replacement/table?page=${newPage}`);
        const data: ReplacementData = await response.json();
        if (data.table === 'null') return alert('Замены не найдены');

        const replacementElement = document.getElementById("replacement");
        if (replacementElement) {
            replacementElement.innerHTML = `<table>${data.table}</table>`;
        }

        replacementPage = newPage;
    } catch (error) {
        console.error('Ошибка при обновлении замены:', error);
    }
};

const changeSchedule = () => {
    const selectedValue = (document.getElementById('selectGroup') as HTMLSelectElement).value;
    fetchAndUpdate(`home/schedule/update?group=${selectedValue}`, {elementId:"schedule"});
};

const replacementPageIncrement =()=>{
    changeReplacementPage(1)
}

const replacementPageDecrement =()=>{
    changeReplacementPage(-1)
}

const Home = () => {
    const userId = TelegramWebApp()
    changeReplacementPage(0)
    fetchAndUpdate(`home/schedule/table?user=${userId}`, {elementId:"schedule"})
    fetchAndUpdate(`home/schedule/select?user=${userId}`, {elementId:"selectGroup"})
    console.log(1)
    return (
        <div>
            <table>
                <tbody>
                <tr className="line"></tr>
                <tr>
                    <td className="title">
                        <b>Расписание</b>
                        <form name="myForm">
                            <select onChange={changeSchedule} name="selectGroup" id="selectGroup"></select>▼
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="schedule"></div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <button onClick={replacementPageIncrement} className="arrow">
                            <img src="/images/arrowLeft.svg" alt="arrowLeft"/>
                        </button>
                    </td>
                    <td className="title"><b>Замены</b></td>
                    <td>
                        <button onClick={replacementPageDecrement} className="arrow">
                            <img src="/images/arrowRight.svg" alt="arrowRight"/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div id="replacement"></div>
        </div>
    );
};

export default Home;