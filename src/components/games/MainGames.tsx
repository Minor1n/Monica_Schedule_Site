import React, {useState} from 'react';
import MainMafia from "@components/games/mafia/MainMafia";
import Buffer from "@components/Buffer";

type VisibleSection = 'Mafia' | null

const MainGames = () => {
    const [visibleSection, setVisibleSection] = useState<VisibleSection>(null);

    const showSection = (section: VisibleSection) => {
        setVisibleSection(section);
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
            {visibleSection === 'Mafia' && (
                <MainMafia/>
            )}
            <Buffer/>
        </div>
    );
};

export default MainGames;