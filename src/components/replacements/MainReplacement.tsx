import React, {useLayoutEffect, useState} from 'react';
import LoadingScreen from "@components/LoadingScreen";
import Arrows from "@components/Arrows";
import axios from "@axios";

let replacementPage = 0

const MainReplacement = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [replacement, setReplacement] = useState<string>('')

    const load = async ()=>{
        const data = await axios.home.replacement.table(replacementPage)
        if (data.table === 'null') return alert('Замены не найдены');
        setReplacement(data.table)
    }

    const changePage = async (page:number) =>{
        const data = await axios.home.replacement.table(page)
        if (data.table === 'null') return alert('Замены не найдены');
        replacementPage = page
        setReplacement(data.table)
    }
    const replacementPageIncrement = async ()=>{
        await changePage(replacementPage+1)
    }
    const replacementPageDecrement = async ()=>{
        await changePage(replacementPage-1)
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