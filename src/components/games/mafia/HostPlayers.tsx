import React from 'react';
import IPlayer from "@interfaces/IPlayer";
import IMafiaHostPlayers from "@interfaces/components/IMafiaHostPlayers";

const HostPlayers:React.FC<IMafiaHostPlayers> = ({players,kill,relive}) => {
    return (
        <>{players && (
            <table>
                <tbody>
                <tr>
                    <td colSpan={3}><b className="title">Игроки:</b></td>
                </tr>
                {players.map((player:IPlayer) => (
                    player.isDeath === 'true' ? <tr style={{backgroundColor:'red'}}>
                            <td><b className='profileB'>{player.userName}</b></td>
                            <td><b className='profileB'>{player.role}</b></td>
                            <td>
                                <button style={{height:'100%',width:'100%'}} onClick={() => relive(player.userId)}>
                                    <b className='profileB'>Возродить</b>
                                </button>
                            </td>
                        </tr> :
                        <tr>
                            <td><b className='profileB'>{player.userName}</b></td>
                            <td><b className='profileB'>{player.role}</b></td>
                            <td>
                                <button style={{height:'100%',width:'100%'}} onClick={() => kill(player.userId)}>
                                    <b className='profileB'>Убить</b>
                                </button>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
        )}</>
    );
};

export default HostPlayers;