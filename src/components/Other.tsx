import React, { useState } from 'react';
import MatrixDeterminant from './MatrixDeterminant';
import MatrixMultiplication from './MatrixMultiplication';
import MatrixInversion from './MatrixInversion';
import MafiaSessions from "./MafiaSessions";

type VisibleSection = 'MatrixDeterminant' | 'MatrixMultiplication' | 'MatrixInversion' |  'Mafia' | null;

const Other = () => {
    const [visibleSection, setVisibleSection] = useState<VisibleSection>(null);

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
    };

    const closeModal = () => {
        setVisibleSection(null);
    };

    return (
        <div>
            {visibleSection !== 'Mafia' && (
                <table>
                    <tbody>
                    <tr>
                        <td className="line"></td>
                    </tr>
                    <tr>
                        <td className="title">
                            <b>Прочий функционал</b>
                        </td>
                    </tr>
                    <tr>
                        <td className="line"></td>
                    </tr>
                    <tr>
                        <td className="line"></td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => showSection('MatrixDeterminant')} className="bloc-icon" style={{ height: '100%', width: '100%', textAlign:'left'}}>
                                <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор определителя матрицы</b>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className='profileB'>
                            <button onClick={() => showSection('MatrixMultiplication')} className="bloc-icon" style={{ height: '100%', width: '100%', textAlign:'left'}}>
                                <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор произведения матриц</b>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => showSection('MatrixInversion')} className="bloc-icon" style={{ height: '100%', width: '100%', textAlign:'left'}}>
                                <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор обратной матрицы</b>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => showSection('Mafia')} className="bloc-icon" style={{ height: '100%', width: '100%', textAlign:'left'}}>
                                <b style={{fontSize: '3.5vw', padding: '1vw'}}>Мафия</b>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            {visibleSection && visibleSection !== 'Mafia' && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>

                        <div className="modal-body">
                            {visibleSection === 'MatrixDeterminant' && <MatrixDeterminant/>}
                            {visibleSection === 'MatrixMultiplication' && <MatrixMultiplication/>}
                            {visibleSection === 'MatrixInversion' && <MatrixInversion/>}
                        </div>
                    </div>
                </div>
            )}
            {visibleSection === 'Mafia' && (
                <MafiaSessions/>
            )}
            <div className="buf"/>
        </div>
    );
};

export default Other;