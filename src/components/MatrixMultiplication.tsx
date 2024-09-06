import React, { useState } from "react";

const MatrixMultiplication: React.FC = () => {
    const [rowsA, setRowsA] = useState(2);
    const [colsA, setColsA] = useState(2);
    const [rowsB, setRowsB] = useState(2);
    const [colsB, setColsB] = useState(2);
    const [matrixA, setMatrixA] = useState<string[][]>(
        Array.from({ length: 2 }, () => Array(2).fill(""))
    );
    const [matrixB, setMatrixB] = useState<string[][]>(
        Array.from({ length: 2 }, () => Array(2).fill(""))
    );
    const [result, setResult] = useState<number[][] | null>(null);
    const [solutionSteps, setSolutionSteps] = useState<string[][] | null>(null);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        row: number,
        col: number,
        matrix: "A" | "B"
    ) => {
        const value = event.target.value;
        if (matrix === "A") {
            const updatedMatrix = [...matrixA];
            updatedMatrix[row] = [...updatedMatrix[row]]; // Изменяем только текущую строку
            updatedMatrix[row][col] = value;
            setMatrixA(updatedMatrix);
        } else {
            const updatedMatrix = [...matrixB];
            updatedMatrix[row] = [...updatedMatrix[row]]; // Изменяем только текущую строку
            updatedMatrix[row][col] = value;
            setMatrixB(updatedMatrix);
        }
    };

    const handleMatrixResize = (
        setMatrix: React.Dispatch<React.SetStateAction<string[][]>>,
        rows: number,
        cols: number
    ) => {
        setMatrix(Array.from({ length: rows }, () => Array(cols).fill(""))); // Правильное создание матрицы
    };

    const multiplyMatrices = () => {
        if (colsA !== rowsB) {
            alert("Количество столбцов в матрице A должно быть равно количеству строк в матрице B.");
            return;
        }

        const parsedMatrixA = matrixA.map(row => row.map(value => parseFloat(value) || 0));
        const parsedMatrixB = matrixB.map(row => row.map(value => parseFloat(value) || 0));

        const resultMatrix: number[][] = Array.from({ length: rowsA }, () =>
            Array(colsB).fill(0)
        );
        const stepsMatrix: string[][] = Array.from({ length: rowsA }, () =>
            Array(colsB).fill("")
        );

        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                let step = [];
                for (let k = 0; k < colsA; k++) {
                    const multiplication = parsedMatrixA[i][k] * parsedMatrixB[k][j];
                    resultMatrix[i][j] += multiplication;
                    step.push(`${parsedMatrixA[i][k]} * ${parsedMatrixB[k][j]}`);
                }
                stepsMatrix[i][j] = step.join(" + ");
            }
        }
        setResult(resultMatrix);
        setSolutionSteps(stepsMatrix);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const form = e.currentTarget.form;
            const index = Array.prototype.indexOf.call(form, e.currentTarget);
            const nextElement = form?.elements[index + 1] as HTMLInputElement | null;
            if (nextElement && nextElement.type !== 'submit') {
                nextElement.focus();
            }
            e.preventDefault();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        multiplyMatrices();
    };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <td className='line'></td>
                </tr>
                <tr>
                    <td><b className='calcResult'>Произведение матриц</b></td>
                </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                <tr>
                    <td className='profileB' colSpan={2}>Матрица A<sub>{rowsA}{colsA}</sub></td>
                </tr>
                <tr>
                    <td className='profileB' style={{width:'50%'}}>
                        <label>Строки: </label>
                        <input
                            className='fontFive'
                            style={{fontSize:'3.5vw'}}
                            type="number"
                            value={rowsA}
                            onChange={(e) => {
                                const newRows = parseInt(e.target.value) || 1;
                                setRowsA(newRows);
                                handleMatrixResize(setMatrixA, newRows, colsA);
                            }}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </td>
                    <td className='profileB' style={{width:'50%'}}>
                        <label>Столбцы: </label>
                        <input
                            className='fontFive'
                            style={{fontSize:'3.5vw'}}
                            type="number"
                            value={colsA}
                            onChange={(e) => {
                                const newCols = parseInt(e.target.value) || 1;
                                setColsA(newCols);
                                handleMatrixResize(setMatrixA, rowsA, newCols);
                            }}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                {matrixA.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    className='fontFive'
                                    style={{ width: '100%' }}
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleInputChange(e, rowIndex, colIndex, "A")}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <table>
                <tbody>
                <tr style={{height:'5vw'}}>
                    <td><img src="/images/multiply.svg" alt="equal" style={{height: '3.5vw'}}/></td>
                </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                <tr>
                    <td className='profileB' colSpan={2}>Матрица B<sub>{rowsB}{colsB}</sub></td>
                </tr>
                <tr>
                    <td className='profileB' style={{width:'50%'}}>
                        <label>Строки: </label>
                        <input
                            className='fontFive'
                            style={{fontSize:'3.5vw'}}
                            type="number"
                            value={rowsB}
                            onChange={(e) => {
                                const newRows = parseInt(e.target.value) || 1;
                                setRowsB(newRows);
                                handleMatrixResize(setMatrixB, newRows, colsB);
                            }}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </td>
                    <td className='profileB' style={{width:'50%'}}>
                        <label>Столбцы: </label>
                        <input
                            className='fontFive'
                            style={{fontSize:'3.5vw'}}
                            type="number"
                            value={colsB}
                            onChange={(e) => {
                                const newCols = parseInt(e.target.value) || 1;
                                setColsB(newCols);
                                handleMatrixResize(setMatrixB, rowsB, newCols);
                            }}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                {matrixB.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    className='fontFive'
                                    style={{ width: '100%' }}
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleInputChange(e, rowIndex, colIndex, "B")}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <table>
                <tbody>
                <tr>
                    <td className='calcResult'>
                        <button type='submit' className='profileB'>
                            <img src="/images/equal.svg" alt="equal" style={{height:'5vw'}}/>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className='line'></td>
                </tr>
                <tr>
                    <td className='line'></td>
                </tr>
                <tr>
                    <td className='profileB'>Матрица C<sub>{rowsA}{colsB}</sub></td>
                </tr>
                </tbody>
            </table>

            {result && (
                <>
                    <table>
                        <tbody>
                        {result.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex} className='fontFive'>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                        <tr>
                            <td className='calcResult'>Шаги решения:</td>
                        </tr>
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                        {solutionSteps?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((step, colIndex) => (
                                    <td key={colIndex} className='profileB'>{step}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </form>
    );
};

export default MatrixMultiplication;