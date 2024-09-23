import React, {useEffect, useState } from 'react';
import { userId, api } from '../index';
import {io, Socket } from 'socket.io-client';
import LoadingScreen from './LoadingScreen';

interface IPlayer {
    userId: string;
    userName: string;
    role: string;
    isDeath: 'true'|'false';
}

interface IMafiaPlayerProps {
    sessionId: number;
}

const MafiaPlayer:React.FC<IMafiaPlayerProps> = ({sessionId}) => {
    const [isRendered, setIsRendered] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [players, setPlayers] = useState<IPlayer[]>()
    const [player, setPlayer] = useState<IPlayer>()

    useEffect(() => {
        const newSocket = io(api);
        setSocket(newSocket);
        newSocket.emit('joinPlayer',{
            userId,
            socketId:newSocket.id,
            sessionId
        })
        setIsRendered(true)

        newSocket.on('updatePlayers', (updatedPlayers: { newPlayers: IPlayer[], sessionId:number }) => {
            setPlayers(updatedPlayers.newPlayers);
        });
        newSocket.on('updatePlayer', (updatedPlayer: IPlayer) => {
            if(Number(updatedPlayer.userId) === userId){
                setPlayer(updatedPlayer);
            }
        });

        return () => {
            newSocket.close();
        };
    }, [sessionId]);

    if(!isRendered){
        return (<LoadingScreen/>)
    }
    return (
        <>
            <table>
                <tbody>
                <tr>
                    <td><b className="profileB">Ваша роль:</b></td>
                    <td><b className="profileB">{player?.role}</b></td>
                </tr>
                </tbody>
            </table>
            {players && (
                <table>
                    <tbody>
                    <tr>
                        <td colSpan={3}><b className="title">Игроки:</b></td>
                    </tr>
                    {players.map((player: IPlayer) => {
                        return player.isDeath === 'true' ? <tr style={{backgroundColor: 'red'}}>
                                <td><b className='profileB'>{player.userName}</b></td>
                            </tr> :
                            <tr>
                                <td><b className='profileB'>{player.userName}</b></td>
                            </tr>
                    })}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default MafiaPlayer;