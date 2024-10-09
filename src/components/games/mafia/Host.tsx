import React, {useEffect, useState} from 'react';
import {api, userId} from "@index";
import LoadingScreen from "@components/LoadingScreen";
import {io, Socket} from "socket.io-client";
import IPlayer from "@interfaces/IPlayer";
import IRole from "@interfaces/IRole";
import SelectRoles from "./SelectRoles";
import HostPlayers from "./HostPlayers";

const rolesNames = new Map<number,string>([
    [0,'Мирный житель'],
    [1,'Мафия'],
    [2,'Шериф'],
    [3,'Доктор'],
    [4,'Любовница'],
    [5,'Маньяк'],
    [6,'Лунатик'],
    [7,'Патрульный']
])

const Host = () => {
    const [isRendered, setIsRendered] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [players, setPlayers] = useState<IPlayer[]>()
    const [roles, setRoles] = useState<IRole[]>(
        Array.from(rolesNames, ([id, name]) => ({
            name: name ?? 'Роль не найдена',
            count: 0,
        }))
    )
    const [notes, setNotes] = useState<string>('')

    const saveRoles = async (role:number,count:number)=>{
        const newRoles = [...roles]
        newRoles[role].count = count
        setRoles(newRoles)
    }

    const startGame = async ()=>{
        const arrRoles:string[] = roles.flatMap(role => Array(role.count).fill(role.name))
        const newPlayers:IPlayer[] = []
        if(players){
            for(let i = 0; i<players.length; i++){
                if (players&&players[i]) {
                    const randomIndex = Math.floor(Math.random() * arrRoles.length);
                    players[i].role = arrRoles[randomIndex]
                    newPlayers.push(players[i])
                    arrRoles.splice(randomIndex, 1);
                }
            }
            socket?.emit('setPlayers', {newPlayers,sessionId:userId})
            setPlayers(newPlayers)
        }
    }

    const playerRelive = async (user:string)=>{
        const newPlayers:IPlayer[]|undefined = players?.map(player => ({
            ...player,
            isDeath : player.userId === user ? 'false' : player.isDeath
        }))
        newPlayers ? setPlayers(newPlayers) : alert('Error');
        socket?.emit('setPlayers',{newPlayers,sessionId:userId})
    }

    const playerKill = async (user:string)=>{
        const newPlayers:IPlayer[]|undefined = players?.map(player => ({
            ...player,
            isDeath : player.userId === user ? 'true' : player.isDeath
        }))
        newPlayers ? setPlayers(newPlayers) : alert('Error');
        socket?.emit('setPlayers',{newPlayers,sessionId:userId})
    }


    useEffect(() => {
        const newSocket = io(api);
        setSocket(newSocket);
        newSocket.emit('setHost',{
            userId,
            socketId:newSocket.id
        })
        setIsRendered(true)

        newSocket.on('updatePlayers', (updatedPlayers: { newPlayers: IPlayer[], sessionId:number }) => {
            if(updatedPlayers.sessionId === userId){
                setPlayers(updatedPlayers.newPlayers);
            }
        });

        return () => {
            newSocket.close();
        };
    }, []);

    if(!isRendered){
        return (<LoadingScreen/>)
    }

    return (
<>
    <SelectRoles roles={roles} onChange={saveRoles}/>

    <table>
        <tbody>
        <tr>
            <td>
                <button style={{height:'100%',width:'100%'}} onClick={()=>startGame()}>
                    <b className='profileB'>Начать</b>
                </button>
            </td>
        </tr>
        </tbody>
    </table>

    <HostPlayers players={players} kill={playerKill} relive={playerRelive}/>

    <table>
        <tbody>
        <tr>
            <td><b className="title">Заметки</b></td>
        </tr>
        <tr style={{height:'50vw'}}>
            <td><b className='profileB'>
                <textarea
                    style={{all:'unset',textAlign:'left',height:'100%',width:'100%'}}
                    value={notes}
                    onChange={(e)=>setNotes(e.target.value)} required/>
            </b></td>
        </tr>
        </tbody>
    </table>
</>
    );
};

export default Host;