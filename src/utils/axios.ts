import axios from 'axios';
import {api, userId} from '@index'
import IGradient from "@interfaces/axios/IGradient";
import ITable from "@interfaces/axios/ITable";
import IAlert from "@interfaces/axios/IAlert";
import IMafiaPlayers from "@interfaces/axios/IMafiaPlayers";
import ISession from "@interfaces/ISession";
import IUser from "@interfaces/IUser";
import INotifications from "@interfaces/INotifications";
import ITheme from "@interfaces/ITheme";
import IStatus from "@interfaces/axios/IStatus";

const fetchData = async <T>(endpoint: string): Promise<T> => {
    const res = await axios.get(`${api}/${endpoint}`);
    return res.data;
};

const postData = async (endpoint: string, params: string) => {
    await axios.post(`${api}/${endpoint}?${params}`);
};

const config = {
    gradient: async (): Promise<IGradient> => fetchData<IGradient>(`gradient?user=${userId}`),
    paymentStatus: async (): Promise<IStatus> => fetchData<IStatus>(`paymentStatus?user=${userId}`),
    home: {
        schedule: {
            table: async (): Promise<ITable> => fetchData<ITable>(`home/schedule/table?user=${userId}`),
            select: async (): Promise<ITable> => fetchData<ITable>(`home/schedule/select?user=${userId}`),
            update: async (group: string): Promise<ITable> => fetchData<ITable>(`home/schedule/update?group=${group}`),
        },
        replacement: {
            table: async (page: number): Promise<ITable> => fetchData<ITable>(`home/replacement/table?user=${userId}&page=${page}`),
            groupTable: async (): Promise<ITable> => fetchData<ITable>(`home/replacement/groupTable?user=${userId}`),
        }
    },
    duty: {
        table: async (page: number): Promise<ITable> => fetchData<ITable>(`duty/table?user=${userId}&page=${page}`),
        checkin: async (): Promise<IAlert> => fetchData<IAlert>(`duty/checkin?user=${userId}`),
    },
    profile: {
        info: {
            table: async (): Promise<IUser> => fetchData<IUser>(`profile/info/table?user=${userId}`),
            refKey: async (refKey: string): Promise<IAlert> => fetchData(`profile/info/refKey?user=${userId}&refKey=${refKey}`),
            monthPay: async (months: number): Promise<IAlert> => fetchData(`profile/info/monthPay?user=${userId}&months=${months}`),
        },
        settings: {
            group: async (group: string) => postData('profile/settings/group', `user=${userId}&group=${group}`),
            dutyDay: async (day: number) => postData('profile/settings/dutyDay', `user=${userId}&day=${day}`),
            name: async (name: string) => postData('profile/settings/name', `user=${userId}&name=${name}`),
        }
    },
    settings: {
        notification: {
            table: async (): Promise<INotifications> => fetchData<INotifications>(`settings/notifications/table?user=${userId}`),
            schedule: async () => postData('settings/notifications/schedule', `user=${userId}`),
            replacement: async () => postData('settings/notifications/replacement', `user=${userId}`),
            groupReplacement: async () => postData('settings/notifications/groupReplacement', `user=${userId}`),
            duty: async () => postData('settings/notifications/duty', `user=${userId}`),
        },
        theme: {
            table: async (): Promise<ITheme> => fetchData<ITheme>(`settings/theme/table?user=${userId}`),
            background: async (url: string) => postData('settings/theme/background', `user=${userId}&url=${url}`),
            lightMode: async () => postData('settings/theme/lightMode', `user=${userId}`),
        }
    },
    games: {
        mafia: {
            sessions: async (): Promise<ISession[]> => fetchData('games/mafia/sessions'),
            exit: async (user:number): Promise<ISession[]> => fetchData(`games/mafia/exit?user=${user}`),
            players: async (): Promise<IMafiaPlayers[]> => fetchData(`games/mafia/players?user=${userId}`),
        }
    },
};

export default config