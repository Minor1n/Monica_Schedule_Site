import ISession from "@interfaces/ISession";

export default interface IMafiaSessions{
    sessions?:ISession[];
    join:(authorId:number)=>void;
    exit:(session:ISession)=>void;
}