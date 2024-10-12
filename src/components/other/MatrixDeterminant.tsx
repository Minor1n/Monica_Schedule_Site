import React, { useState } from 'react';
import {enter} from "@handlers/keyDown/enter";

const calculateDeterminant = (matrix: number[][], steps: React.JSX.Element[]): number => {
    const n = matrix.length;

    if (n === 1) {
        steps.push(
            <tr key={`step-${n}-1`}>
                <td className="calcStep">Определитель матрицы 1x1:</td>
                <td className="calcStep">{matrix[0][0]}</td>
            </tr>
        );
        return matrix[0][0];
    }

    if (n === 2) {
        const result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        steps.push(
            <tr key={`step-${n}-2`}>
                <td className="calcStep">Определитель матрицы 2x2:</td>
                <td className="calcStep">{matrix[0][0]} * {matrix[1][1]} - {matrix[0][1]} * {matrix[1][0]} = {result}</td>
            </tr>
        );
        return result;
    }

    let determinant = 0;

    for (let i = 0; i < n; i++) {
        const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        const cofactor = matrix[0][i] * calculateDeterminant(minor, steps) * (i % 2 === 0 ? 1 : -1);
        steps.push(
            <tr key={`cofactor-${i}`}>
                <td className="calcStep">Кофактор для элемента {matrix[0][i]} (столбец {i + 1}):</td>
                <td className="calcStep">{cofactor}</td>
            </tr>
        );
        determinant += cofactor;
    }

    steps.push(
        <tr key={`determinant-${n}`}>
            <td className="calcStep">Определитель матрицы порядка {n}:</td>
            <td className="calcStep">{determinant}</td>
        </tr>
    );
    return determinant;
};

const MatrixDeterminant = () => {
    const [order, setOrder] = useState<number>(3);
    const [matrix, setMatrix] = useState<string[][]>(Array(3).fill(Array(3).fill('')));
    const [determinant, setDeterminant] = useState<number | null>(null);
    const [solutionSteps, setSolutionSteps] = useState<React.JSX.Element[]>([]);

    const handleOrderChange = (value: string) => {
        const newOrder = Math.max(1, Number(value));
        setOrder(newOrder);
        setMatrix(Array(newOrder).fill(Array(newOrder).fill('')));
        setDeterminant(null);
        setSolutionSteps([]);
    };

    const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
        const newMatrix = matrix.map((row, i) =>
            row.map((cell, j) => (i === rowIndex && j === colIndex ? value : cell))
        );
        setMatrix(newMatrix);
    };

    const convertMatrixToNumbers = (): number[][] => {
        return matrix.map(row => row.map(cell => (cell !== '' ? Number(cell) : 0)));
    };

    const calculate = () => {
        const numericMatrix = convertMatrixToNumbers();
        const steps: React.JSX.Element[] = [];
        const result = calculateDeterminant(numericMatrix, steps);
        setDeterminant(result);
        setSolutionSteps(steps);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculate();
    };

    const clearMatrix = () => {
        setMatrix(Array(order).fill(Array(order).fill('')));
        setDeterminant(null);
        setSolutionSteps([]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr className="line"></tr>
                    <tr>
                        <td colSpan={2} className="title"><b>Определитель матрицы</b></td>
                        <td className="calcInput title" style={{width:'32vw'}}><input
                            style={{width:'11vw',height:'100%'}}
                            type="number"
                            min={2}
                            value={order}
                            onChange={(e) => handleOrderChange(e.target.value)}
                        /> порядка</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr className="calcHeight" key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        className="calcInput"
                                        key={colIndex}
                                        type="number"
                                        value={cell}
                                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                        onKeyDown={enter}
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
                    <tr className="fiveHeight">
                        <td>
                            <button type="submit">
                                <img src="/images/equal.svg" alt="equal" className="calcHeight"/>
                            </button>
                        </td>
                        <td className="calcResult">
                            {determinant !== null && determinant}
                        </td>
                        <td>
                            <button type="button" onClick={clearMatrix}>
                                <img src="/images/return.svg" alt="return" className="calcHeight"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                {determinant!==null && (
                    <table>
                        <tbody>
                        <tr>
                            <td colSpan={2} className="calcResult">Шаги решения:</td>
                        </tr>
                        <tr>
                            <td className='line'></td>
                        </tr>
                        <tr>
                            <td className='line'></td>
                        </tr>
                        {solutionSteps}
                        </tbody>
                    </table>
                )}
            </form>
        </div>
    );
};

export default MatrixDeterminant;