import React, { useState } from 'react';

type Matrix = (string | number)[][];

const MatrixInversion: React.FC = () => {
    const [size, setSize] = useState<number>(3);
    const [matrix, setMatrix] = useState<Matrix>(Array.from({ length: size }, () => Array(size).fill('')));
    const [inverse, setInverse] = useState<Matrix | null>(null);
    const [determinant, setDeterminant] = useState<number|null>(null)
    const [minors, setMinors] = useState<Matrix | null>(null);
    const [cofactors, setCofactors] = useState<Matrix | null>(null);
    const [adjugateMatrix, setAdjugateMatrix] = useState<Matrix | null>(null);

    const calculateDeterminant = (matrix: Matrix): number => {
        const size = matrix.length;

        if (size === 1) {
            return Number(matrix[0][0]);
        }

        if (size === 2) {
            return Number(matrix[0][0]) * Number(matrix[1][1]) - Number(matrix[0][1]) * Number(matrix[1][0]);
        }

        let determinant = 0;
        for (let i = 0; i < size; i++) {
            const subMatrix = matrix
                .slice(1)
                .map(row => row.filter((_, colIndex) => colIndex !== i));
            determinant += Number(matrix[0][i]) * calculateDeterminant(subMatrix) * ((i % 2 === 0) ? 1 : -1);
        }

        return determinant;
    };

    const calculateMatrixOfMinors = (matrix: Matrix): Matrix => {
        const size = matrix.length;
        const minors: Matrix = Array.from({ length: size }, () => Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const subMatrix = matrix
                    .filter((_, rowIndex) => rowIndex !== i)
                    .map(row => row.filter((_, colIndex) => colIndex !== j));
                minors[i][j] = calculateDeterminant(subMatrix);
            }
        }

        return minors;
    };

    const calculateCofactorsMatrix = (matrix: Matrix, minors: Matrix): Matrix => {
        const size = matrix.length;
        const cofactors: Matrix = Array.from({ length: size }, () => Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                cofactors[i][j] = Number(minors[i][j]) * ((i + j) % 2 === 0 ? 1 : -1);
            }
        }

        return cofactors;
    };

    const calculateAdjugateMatrix = (cofactors: Matrix): Matrix => {
        const size = cofactors.length;
        const adjugate: Matrix = Array.from({ length: size }, () => Array(size).fill(0));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                adjugate[i][j] = cofactors[j][i];
            }
        }

        return adjugate;
    };

    const calculateInverse = (inputMatrix: Matrix): Matrix | null => {
        const calcDeterminant = calculateDeterminant(inputMatrix);
        if (calcDeterminant === 0) {
            alert('Матрица вырождена, обратная не существует.');
            return null;
        }
        setDeterminant(calcDeterminant)


        const minorsMatrix = calculateMatrixOfMinors(inputMatrix);
        setMinors(minorsMatrix);

        const cofactorsMatrix = calculateCofactorsMatrix(inputMatrix, minorsMatrix);
        setCofactors(cofactorsMatrix);

        const adjugateMatrixResult = calculateAdjugateMatrix(cofactorsMatrix);
        setAdjugateMatrix(adjugateMatrixResult);

        return adjugateMatrixResult.map(row => row.map(value => Number(value) / calcDeterminant));
    };

    const handleCalculateInverse = (e: React.FormEvent) => {
        e.preventDefault();
        const numericMatrix = matrix.map(row => row.map(value => (value === '' ? 0 : Number(value))));
        const result = calculateInverse(numericMatrix);
        if (result) {
            setInverse(result);
        }
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value);
        if (newSize > 0) {
            setSize(newSize);
            const newMatrix: Matrix = Array(newSize)
                .fill('')
                .map(() => Array(newSize).fill(''));
            setMatrix(newMatrix);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const updatedMatrix = matrix.map((r, rowIndex) =>
            rowIndex === row ? r.map((value, colIndex) => (colIndex === col ? e.target.value : value)) : r
        );
        setMatrix(updatedMatrix);
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

    const clearMatrix = () => {
        setMatrix(Array(size).fill(Array(size).fill('')));
        setInverse(null);
        setDeterminant(null)
        setMinors(null);
        setCofactors(null);
        setAdjugateMatrix(null)
    };

    return (
        <form onSubmit={handleCalculateInverse}>
            <table>
                <tbody>
                <tr>
                    <td><b className='calcResult'>Обратная матрица</b></td>
                    <td style={{ width: '10vw' }}>
                        <button type="button" onClick={clearMatrix}>
                            <img src="/images/return.svg" alt="return" className="calcHeight" />
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <b className='calcResult'>
                            Размер матрицы:
                            <input
                                type="number"
                                value={size}
                                min={1}
                                onKeyDown={handleKeyDown}
                                onChange={handleSizeChange}
                                style={{ width: '50px', marginLeft: '10px' }}
                                required
                            />
                        </b>
                    </td>
                </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    className='fontFive'
                                    style={{ width: '100%' }}
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
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
                    <td>
                        <button type='submit'>
                            <img src="/images/equal.svg" alt="equal" style={{ height: '5vw' }} />
                        </button>
                    </td>
                </tr>
                {inverse && (
                    <tr>
                        <td><b className='calcResult'>Обратная матрица:</b></td>
                    </tr>
                )}
                </tbody>
            </table>
            {inverse && (
                <table>
                    <tbody>
                    {inverse.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((value, colIndex) => (
                                <td key={colIndex} className='fontFive'>
                                    {Number(value).toFixed(2)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {inverse && (
                <table>
                    <tbody>

                    <tr>
                        <td><b className='calcResult'>Шаги решения:</b></td>
                    </tr>
                    {determinant && (<tr>
                        <td className='calcStep'>Определитель: {determinant}</td>
                    </tr>)}
                    </tbody>
                </table>
            )}
            {minors && (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td className='calcStep'> Матрица миноров:</td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                    <tbody>
                        {minors.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex} className='calcStep'>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {cofactors && (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td  className='calcStep'>Матрица алгебраических уравнений:</td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        {cofactors.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex} className='calcStep'>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {adjugateMatrix && (
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td className='calcStep'>Транспонированная матрица:</td>
                        </tr>
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                        {adjugateMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((value, colIndex) => (
                                    <td key={colIndex} className='calcStep'>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </form>
    );
};

export default MatrixInversion;