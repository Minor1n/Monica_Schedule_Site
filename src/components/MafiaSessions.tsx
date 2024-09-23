import React, {useLayoutEffect, useState} from 'react';
import {api, userId} from "../index";
import LoadingScreen from "./LoadingScreen";
import MafiaHost from "./MafiaHost";
import MafiaPlayer from "./MafiaPlayer";

interface ISession {
    authorId: number;
    authorName: string;
    users: number;
}

const MafiaSessions = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [sessions, setSessions] = useState<ISession[]>()
    const [join, setJoin] = useState<number|null>(null)

    const setSessionsF = async ():Promise<void> =>{
        const response = await fetch(`${api}/games/mafia/sessions`)
        const data:ISession[] = await response.json()
        setSessions(data)
    }

    const exit = async (session:ISession)=>{
        const response = await fetch(`${api}/games/mafia/exit?user=${session.authorId}`)
        const data:ISession[] = await response.json()
        setSessions(data)
    }

    const sessionCreate = async ()=>{
        if(userId){
            setJoin(userId)
        }
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
                        {sessions && (
                            sessions.map(session => <tr>
                                <td><b className="profileB">{session.authorName}</b></td>
                                <td><b className="profileB">{session.users}</b></td>
                                <td>
                                    <button onClick={() => sessionJoin(session.authorId)}>
                                        <b className="profileB">Присоединиться</b>
                                    </button>
                                </td>
                                {session.authorId === userId && (
                                    <td>
                                        <button onClick={() => exit(session)}>
                                            <b className="profileB">Закрыть</b>
                                        </button>
                                    </td>
                                )}
                                {session.authorId !== userId && (
                                    <td>
                                        <button disabled={true}><b className="profileB">Закрыть</b></button>
                                    </td>
                                )}
                            </tr>)
                        )}
                        {!sessions && (
                            <tr>
                                <td colSpan={3}><b className="profileB">Сессии не найдены</b></td>
                            </tr>
                        )}
                    </>
                )}
                </tbody>
            </table>
            {join && join === userId && (<MafiaHost/>)}
            {join && join !== userId && (<MafiaPlayer sessionId={Number(join)}/>)}
        </>
    );
};

export default MafiaSessions;