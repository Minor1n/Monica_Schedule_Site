import IRole from "@interfaces/IRole";

export default interface IMafiaSelectRoles {
    roles:IRole[];
    onChange:(role:number,count:number)=>void;
}