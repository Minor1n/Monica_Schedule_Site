import React from 'react';
import Notifications from "./Notifications";
import Theme from "./Theme";

const Settings = () => {
    return (
<div>
    <table>
        <tbody>
        <tr className="line"></tr>
        <tr>
            <td className="title"><b>Настройки</b></td>
        </tr>
        </tbody>
    </table>

    <Notifications/>
    <Theme/>
</div>
    );
};

export default Settings;