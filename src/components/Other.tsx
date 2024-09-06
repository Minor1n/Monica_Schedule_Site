import React, {useState} from 'react';
import Calculator from "./Calculator";
import MatrixMultiplication from "./MatrixMultiplication";

type VisibleSection = 'calculator'|'MatrixMultiplication'

const Other = () => {
    const [visibleSection, setVisibleSection] = useState<VisibleSection>('calculator');

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
    };
    return (
        <div>
            <div className={visibleSection === 'calculator' ? 'visible' : 'hidden'}><Calculator/></div>
            <div className={visibleSection === 'MatrixMultiplication' ? 'visible' : 'hidden'}><MatrixMultiplication/></div>
            <div className="buf"/>
            <nav className="mobile-nav dutyButton">
                <button onClick={() => showSection('calculator')} className="bloc-icon">
                    <img src="/images/calculator.svg" alt="calculator"/>
                </button>
                <button onClick={() => showSection('MatrixMultiplication')} className="bloc-icon">
                    <img src="/images/MatrixMultiplication.svg" alt="MatrixMultiplication"/>
                </button>
            </nav>
        </div>
    );
};

export default Other;