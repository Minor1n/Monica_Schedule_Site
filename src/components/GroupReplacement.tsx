import React, {useLayoutEffect, useState} from 'react';
import {api, userId} from "../index";
import LoadingScreen from "./LoadingScreen";

const GroupReplacement = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [replacement, setReplacement] = useState<string>('')

    const load = async ()=>{
        const response = await fetch(`${api}/home/replacement/groupTable?user=${userId}`)
        const data:{table:string} = await response.json()
        setReplacement(data.table)
    }

    useLayoutEffect(()=>{
        load().then(()=>setIsRendered(true))
    },[])

    if(!isRendered){
        return (<LoadingScreen/>)
    }

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td className="title"><b>Замены</b></td>
                </tr>
                </tbody>
            </table>
            <table dangerouslySetInnerHTML={{__html: replacement}}/>
        </div>
    );
};

export default GroupReplacement;