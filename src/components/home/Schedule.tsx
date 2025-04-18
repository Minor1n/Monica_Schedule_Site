import React, {useLayoutEffect, useState} from 'react';
import LoadingScreen from "@components/LoadingScreen";
import axios from "@axios";

const Schedule = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [table, setTable] = useState<string>('')
    const [select, setSelect] = useState<string>('')

    const load = async ()=>{
        const data1 = await axios.home.schedule.table()
        const data2 = await axios.home.schedule.select()
        setTable(data1.table)
        setSelect(data2.table)
    }

    const changeSchedule = async () => {
        const selectedValue = (document.getElementById('selectGroupSchedule') as HTMLSelectElement).value;
        const data = await axios.home.schedule.update(selectedValue)
        setTable(data.table)
    };

    useLayoutEffect(() => {
        load().then(()=>setIsRendered(true))
    }, []);

    // if(!isRendered){
    //     return (<LoadingScreen/>)
    // }
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td className="title">
                        <b>Расписание</b>
                        <form name="myForm">
                            <select dangerouslySetInnerHTML={{__html: select}}
                                    onChange={changeSchedule}
                                    name="selectGroupSchedule"
                                    id="selectGroupSchedule"/>
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