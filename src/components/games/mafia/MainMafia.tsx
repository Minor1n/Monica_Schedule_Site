import React, {useLayoutEffect, useState} from 'react';
import {userId} from "@index";
import LoadingScreen from "@components/LoadingScreen";
import Host from "./Host";
import Player from "./Player";
import Sessions from "./Sessions";
import ISession from "@interfaces/ISession";
import axios from "@axios";

const MainMafia = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [sessions, setSessions] = useState<ISession[]>()
    const [join, setJoin] = useState<number|null>(null)

    const setSessionsF = async ():Promise<void> =>{
        const data = await axios.games.mafia.sessions()
        setSessions(data)
    }

    const exit = async (session:ISession)=>{
        const data = await axios.games.mafia.exit(session.authorId)
        setSessions(data)
    }

    const sessionCreate = async ()=>{
        console.log(userId)
        setJoin(userId)
    }

    const sessionJoin = async(id:number)=>{
        setJoin(id)
    }

    useLayoutEffect(() => {
        setSessionsF().then(()=>setIsRendered(true))
    }, []);

    if(!isRendered){
        return (<LoadingScreen/>)
    }

    return (
        <>
            <table>
                <tbody>
                <tr>
                    <td className="line" colSpan={4}></td>
                </tr>
                <tr>
                    <td className="title" colSpan={4}>
                        <b>Мафия</b>
                    </td>
                </tr>
                <tr>
                    <td className="line" colSpan={4}></td>
                </tr>
                {join === null && (
                    <>
                        <tr>
                            <td colSpan={4}>
                                <button>
                                    <b className="profileB" onClick={() => sessionCreate()}>Создать сессию</b>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="line" colSpan={4}></td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <b className="profileB">Выберите сессию:</b>
                            </td>
                        </tr>
                        <tr>
                            <td><b className="profileB">Хост</b></td>
                            <td><b className="profileB">Игроки</b></td>
                            <td colSpan={2}><b className="profileB">Действия</b></td>
                        </tr>
                        <tr>
                            <td className="line" colSpan={4}></td>
                        </tr>

                        <Sessions sessions={sessions} join={sessionJoin} exit={exit}/>
                    </>
                )}
                </tbody>
            </table>
            {join && join === userId && (<Host/>)}
            {join && join !== userId && (<Player sessionId={Number(join)}/>)}
        </>
    );
};

export default MainMafia;