import React, {useEffect, useState } from 'react';
import { userId, api } from '@index';
import {io, Socket } from 'socket.io-client';
import LoadingScreen from '@components/LoadingScreen';
import MafiaPlayerPlayers from "./MafiaPlayerPlayers";
import IPlayer from "@interfaces/IPlayer";
import IMafiaPlayer from "@interfaces/components/IMafiaPlayer";

const MafiaPlayer:React.FC<IMafiaPlayer> = ({sessionId}) => {
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
            if(updatedPlayers.sessionId === sessionId){
                setPlayers(updatedPlayers.newPlayers);
            }
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

            <MafiaPlayerPlayers players={players}/>
        </>
    );
};

export default MafiaPlayer;