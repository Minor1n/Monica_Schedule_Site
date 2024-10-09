import React from 'react';
import {userId} from "@index";
import IMafiaSessions from "@interfaces/components/IMafiaSessions";

const Sessions:React.FC<IMafiaSessions> = ({sessions,join,exit}) => {
    return (
        <>
            {sessions && (
                sessions.map(session => <tr>
                    <td><b className="profileB">{session.authorName}</b></td>
                    <td><b className="profileB">{session.users}</b></td>
                    <td>
                        <button onClick={()=>join(session.authorId)}>
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
    );
};

export default Sessions;