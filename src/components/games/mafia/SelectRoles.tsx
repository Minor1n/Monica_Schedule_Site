import React from 'react';
import IMafiaSelectRoles from "@interfaces/components/IMafiaSelectRoles";

const SelectRoles:React.FC<IMafiaSelectRoles> = ({roles,onChange}) => {
    return (
        <form id="roles">
            <table>
                <tbody>
                <tr>
                    <td colSpan={2}><b className="title">Укажите роли:</b></td>
                </tr>
                {roles && roles.map((role, index) =>
                    <tr>
                        <td><b className="profileB">{role.name}</b></td>
                        <td><input
                            style={{height: '100%', width: '100%', fontSize: '3vw'}}
                            min={0} type="number" id="role0" title='0'
                            onChange={(e)=>onChange(index,Number(e.target.value))} required/></td>
                    </tr>
                )}
                </tbody>
            </table>
        </form>
    );
};

export default SelectRoles;