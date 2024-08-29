import React, {useLayoutEffect, useState} from 'react';
import {api, userId} from "../index";
import LoadingScreen from "./LoadingScreen";

const Schedule = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [table, setTable] = useState<string>('')
    const [select, setSelect] = useState<string>('')

    const load = async ()=>{
        const response1 = await fetch(`${api}/home/schedule/table?user=${userId}`)
        const response2 = await fetch(`${api}/home/schedule/select?user=${userId}`)
        const data1:{table:string} = await response1.json()
        const data2:{table:string} = await response2.json()
        setTable(data1.table)
        setSelect(data2.table)
    }

    const changeSchedule = () => {
        const selectedValue = (document.getElementById('selectGroupSchedule') as HTMLSelectElement).value;
        fetch(`${api}/home/schedule/update?group=${selectedValue}`).then(response=>{
            response.json().then((data:{table:string})=>{
                setTable(data.table)
            })
        })
    };

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
                <tr>
                    <td className="title">
                        <b>Расписание</b>
                        <form name="myForm">
                            <select dangerouslySetInnerHTML={{__html: select}} onChange={changeSchedule} name="selectGroupSchedule" id="selectGroupSchedule"/>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
            <table dangerouslySetInnerHTML={{__html: table}}/>
        </div>
    );
};

export default Schedule;