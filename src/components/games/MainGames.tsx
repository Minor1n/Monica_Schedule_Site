import React, {useEffect, useState} from 'react';
import MainMafia from "@components/games/mafia/MainMafia";
import Buffer from "@components/Buffer";

type VisibleSection = 'Mafia' | null

const MainGames = () => {
    const [visibleSection, setVisibleSection] = useState<VisibleSection>(null);

    useEffect(() => {
        setVisibleSection(null)
    }, []);

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
    };

    const closeModal = () => {
        setVisibleSection(null);
    };

    return (
        <div>
            {!visibleSection &&
                (<table>
                    <tbody>
                    <tr>
                        <td className="line"></td>
                    </tr>
                    <tr>
                        <td className="title">
                            <b>Игры</b>
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
                            <button onClick={() => showSection('Mafia')} className="bloc-icon"
                                    style={{height: '100%', width: '100%', textAlign: 'left'}}>
                                <b style={{fontSize: '3.5vw', padding: '1vw'}}>Мафия</b>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>)
            }
            {visibleSection && (
                <div className="modal-overlay" style={{background: 'unset', display:'block'}}>
                    <div className='header-buffer'/>
                    <div className="modal-content" style={{
                        padding: 0,
                        borderRadius: 0,
                        width: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        background: 'unset'
                    }}>
                        <button className="close-button" onClick={closeModal} style={{top: '2.5vw', right: '2.5vw'}}>
                            &times;
                        </button>

                        <div className="modal-body" style={{height: '100%', maxHeight: '100%'}}>
                            {visibleSection === 'Mafia' && <MainMafia/>}
                        </div>
                    </div>
                </div>
            )}
            <Buffer/>
        </div>
    );
};

export default MainGames;