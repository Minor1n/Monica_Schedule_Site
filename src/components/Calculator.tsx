import React, { useState } from 'react';


const calculateDeterminant = (matrix: number[][]): number => {
    const n = matrix.length;

    if (n === 1) {
        return matrix[0][0];
    }

    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;

    for (let i = 0; i < n; i++) {
        const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
        determinant += matrix[0][i] * calculateDeterminant(minor) * (i % 2 === 0 ? 1 : -1);
    }

    return determinant;
};

const Calculator = () => {
    const [order, setOrder] = useState<number>(3);
    const [matrix, setMatrix] = useState<string[][]>(Array(3).fill(Array(3).fill('')));
    const [determinant, setDeterminant] = useState<number | null>(null);

    const handleOrderChange = (value: string) => {
        const newOrder = Math.max(1, Number(value));
        setOrder(Number(value));
        setMatrix(Array(newOrder).fill(Array(newOrder).fill('')));
        setDeterminant(null);
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
        const result = calculateDeterminant(numericMatrix);
        setDeterminant(result);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculate();
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

    const clearMatrix = ()=>{
        setMatrix(Array(order).fill(Array(order).fill('')));
        setDeterminant(null);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr className="line"></tr>
                        <tr>
                            <td colSpan={2} className="title"><b>Калькулятор определителя</b></td>
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
                            <button onClick={clearMatrix}>
                                <img src="/images/return.svg" alt="return" className="calcHeight"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Calculator;