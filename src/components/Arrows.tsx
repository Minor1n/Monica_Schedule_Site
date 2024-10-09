import React from 'react';
import IArrows from "@interfaces/components/IArrows";

const Arrows: React.FC<IArrows> = ({label, onButtonClickRight,onButtonClickLeft}) => {
    return (
        <table>
            <tbody>
            <tr className="line"></tr>
            <tr>
                <td>
                    <button onClick={onButtonClickLeft} className="arrow">
                        <img src="/images/arrowLeft.svg" alt="arrowLeft"/>
                    </button>
                </td>
                <td className="title"><b>{label}</b></td>
                <td>
                    <button onClick={onButtonClickRight} className="arrow">
                        <img src="/images/arrowRight.svg" alt="arrowRight"/>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default Arrows;