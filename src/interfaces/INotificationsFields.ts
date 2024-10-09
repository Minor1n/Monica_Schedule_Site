export default interface INotificationsFields {
    label:string
    onClick:()=>Promise<void>
    notificationType:'on'|'off'
}