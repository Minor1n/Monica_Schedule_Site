import React, {useLayoutEffect, useState} from 'react';
import {api,userId} from "../index";
import LoadingScreen from "./LoadingScreen";

let dutyPage = 0

const Duty = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [table, setTable] = useState<string>('')

    const load = async ()=>{
        const response = await fetch(`${api}/duty/table?user=${userId}&page=${dutyPage}`)
        const data:{table:string} = await response.json()
        setTable(data.table)
    }

    const dutyCheckIn = async () => {
        const response = await fetch(`${api}/duty/checkin?user=${userId}`)
        const data = await response.json();
        alert(data.alert)
        await load()
    }

    const dutyIncrement = async ()=>{
        dutyPage += 1
        await load()
    }
    const dutyDecrement = async ()=>{
        if (dutyPage-1 < 0) return alert(`Дежурства не найдены!`);
        dutyPage -= 1
        await load()
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
            <table dangerouslySetInnerHTML={{__html: table}}/>
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