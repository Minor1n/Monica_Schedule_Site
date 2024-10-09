import React from 'react';
import IPlayer from "@interfaces/IPlayer";
import IMafiaPlayerPlayers from "@interfaces/components/IMafiaPlayerPlayers";

const MafiaPlayerPlayers:React.FC<IMafiaPlayerPlayers> = ({players}) => {
    return (
        <>
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

export default MafiaPlayerPlayers;