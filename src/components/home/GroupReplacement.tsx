import React, {useLayoutEffect, useState} from 'react';
import LoadingScreen from "@components/LoadingScreen";
import axios from "@axios";

const GroupReplacement = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [replacement, setReplacement] = useState<string>('')

    const load = async ()=>{
        const data = await axios.home.replacement.groupTable()
        setReplacement(data.table)
    }

    useLayoutEffect(()=>{
        load().then(()=>setIsRendered(true))
    },[])

    // if(!isRendered){
    //     return (<LoadingScreen/>)
    // }

    return (
        <div>
            <table>
                <tbody>
                <tr className="line"></tr>
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