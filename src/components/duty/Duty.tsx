import React, {useLayoutEffect, useState} from 'react';
import {api,userId} from "@index";
import LoadingScreen from "@components/LoadingScreen";
import Arrows from "@components/Arrows";
import Navigation from "@components/Navigation";
import Buffer from "@components/Buffer";

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
            <Arrows label='Дежурства' onButtonClickLeft={dutyIncrement} onButtonClickRight={dutyDecrement}/>
            <table dangerouslySetInnerHTML={{__html: table}}/>
            <Buffer/>
            <Navigation className="dutyButton">
                <button onClick={dutyCheckIn} className="bloc-icon">
                    <b className="title">Отдежурил</b>
                </button>
            </Navigation>
        </div>
    );
};

export default Duty;