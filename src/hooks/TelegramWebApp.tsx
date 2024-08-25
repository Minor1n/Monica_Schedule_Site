import { useEffect, useState } from 'react';

type TelegramUser = string

const TelegramWebApp = ():string => {
    const [user, setUser] = useState<TelegramUser>('6018898378');

    useEffect(() => {
        const tgScript = document.createElement('script');
        tgScript.src = 'https://telegram.org/js/telegram-web-app.js';
        tgScript.async = true;
        document.body.appendChild(tgScript);

        tgScript.onload = () => {
            const tg = (window as any).Telegram.WebApp;
            const userId: TelegramUser | undefined = tg?.initDataUnsafe?.user;
            if (userId) {
                setUser(userId);
            } else {
                setUser('6018898378')
                // alert('Вы не можете использовать monica_schedule в браузере');
            }
        };
        document.body.removeChild(tgScript);
    }, []);

    return user;
};

export default TelegramWebApp;