import React, {useLayoutEffect, useState} from 'react';
import {api} from "@index";
import LoadingScreen from "@components/LoadingScreen";
import Arrows from "@components/Arrows";
import IReplacementData from "@interfaces/IReplacementData";

let replacementPage = 0

const MainReplacement = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [replacement, setReplacement] = useState<string>('')

    const load = async ()=>{
        const response = await fetch(`${api}/home/replacement/table?page=${replacementPage}`)
        const data:IReplacementData = await response.json()
        if (data.table === 'null') return alert('Замены не найдены');
        setReplacement(data.table)
    }

    const changePage = (page:number) =>{
        fetch(`${api}/home/replacement/table?page=${page}`).then(response=>{
            response.json().then((data:IReplacementData)=>{
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
            <Arrows label="Замены" onButtonClickLeft={replacementPageIncrement} onButtonClickRight={replacementPageDecrement}/>
            <table dangerouslySetInnerHTML={{__html: replacement}}/>
        </div>
    );
};

export default MainReplacement;