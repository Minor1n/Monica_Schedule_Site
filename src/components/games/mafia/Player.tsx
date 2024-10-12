import React, {useEffect, useState } from 'react';
import { userId, api } from '@index';
import {io} from 'socket.io-client';
import LoadingScreen from '@components/LoadingScreen';
import PlayerPlayers from "./PlayerPlayers";
import IPlayer from "@interfaces/IPlayer";
import IMafiaPlayer from "@interfaces/components/IMafiaPlayer";

const Player:React.FC<IMafiaPlayer> = ({sessionId}) => {
    const [isRendered, setIsRendered] = useState(false);
    const [players, setPlayers] = useState<IPlayer[]>()
    const [player, setPlayer] = useState<IPlayer>()

    useEffect(() => {
        const newSocket = io(api);
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

            <PlayerPlayers players={players}/>
        </>
    );
};

export default Player;