import IPlayer from "@interfaces/IPlayer";

export default interface IMafiaHostPlayers{
    players?:IPlayer[];
    kill:(userId:string)=>void;
    relive:(userId:string)=>void;
}