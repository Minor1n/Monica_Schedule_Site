import React, {useLayoutEffect, useState} from 'react';
import {api} from "../index";
import LoadingScreen from "./LoadingScreen";

interface ReplacementData {
    table: string;
}

let replacementPage = 0

const Replacement = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [replacement, setReplacement] = useState<string>('')

    const load = async ()=>{
        const response = await fetch(`${api}/home/replacement/table?page=${replacementPage}`)
        const data:ReplacementData = await response.json()
        if (data.table === 'null') return alert('Замены не найдены');
        setReplacement(data.table)
    }

    const changePage = (page:number) =>{
        fetch(`${api}/home/replacement/table?page=${page}`).then(response=>{
            response.json().then((data:ReplacementData)=>{
                if (data.table === 'null') return alert('Замены не найдены');
                replacementPage = page
                setReplacement(data.table)
            })
        })
    }
    const replacementPageIncrement =()=>{
        changePage(replacementPage+1)
    }
    const replacementPageDecrement =()=>{
        changePage(replacementPage-1)
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
            <table dangerouslySetInnerHTML={{__html: replacement}}/>
        </div>
    );
};

export default Replacement;