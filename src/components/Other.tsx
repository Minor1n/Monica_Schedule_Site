import React, { useState } from 'react';
import MatrixDeterminant from './MatrixDeterminant';
import MatrixMultiplication from './MatrixMultiplication';
import MatrixInversion from './MatrixInversion';

type VisibleSection = 'MatrixDeterminant' | 'MatrixMultiplication' | 'MatrixInversion' | null;

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
                        <button onClick={() => showSection('MatrixDeterminant')} className="bloc-icon">
                            <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор определителя матрицы</b>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className='profileB'>
                        <button onClick={() => showSection('MatrixMultiplication')} className="bloc-icon">
                            <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор произведения матриц</b>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={() => showSection('MatrixInversion')} className="bloc-icon">
                            <b style={{fontSize: '3.5vw', padding: '1vw'}}>Калькулятор обратной матрицы</b>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
            {visibleSection && (
                <div className="modal-overlay">
                <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>

                        <div className="modal-body">
                            {visibleSection === 'MatrixDeterminant' && <MatrixDeterminant />}
                            {visibleSection === 'MatrixMultiplication' && <MatrixMultiplication />}
                            {visibleSection === 'MatrixInversion' && <MatrixInversion />}
                        </div>
                    </div>
                </div>
            )}

            <div className="buf" />
        </div>
    );
};

export default Other;