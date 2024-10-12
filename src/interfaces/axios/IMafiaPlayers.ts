export default interface IMafiaPlayers{
    role: string;
    isDeath: 'true' | 'false';
    userName: string | undefined;
    userId: number;
}