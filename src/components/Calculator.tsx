import React, { useState } from 'react';

interface Inputs {
    a11: string;
    a12: string;
    a13: string;
    a21: string;
    a22: string;
    a23: string;
    a31: string;
    a32: string;
    a33: string;
}

const Calculator = () => {
    const [inputs, setInputs] = useState<Inputs>({
        a11: '', a12: '', a13: '',
        a21: '', a22: '', a23: '',
        a31: '', a32: '', a33: ''
    });
    const [result, setResult] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prevState => ({ ...prevState, [name]: value }));
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

    const calculateResult = () => {
        const { a11, a12, a13, a21, a22, a23, a31, a32, a33 } = inputs;
        const sum =
            Number(a11) * (Number(a22) * Number(a33) - Number(a23) * Number(a32)) -
            Number(a12) * (Number(a21) * Number(a33) - Number(a23) * Number(a31)) +
            Number(a13) * (Number(a21) * Number(a32) - Number(a22) * Number(a31));
        setResult(sum);
    };

    const clearFields = ()=>{
        setInputs({
            a11: '', a12: '', a13: '',
            a21: '', a22: '', a23: '',
            a31: '', a32: '', a33: ''
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        calculateResult();
    };

    const inputIds: Array<Array<keyof Inputs>> = [
        ['a11', 'a12', 'a13'],
        ['a21', 'a22', 'a23'],
        ['a31', 'a32', 'a33']
    ];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr className="line"></tr>
                    <tr>
                        <td colSpan={3} className="title"><b>Калькулятор определителя 3-го порядка</b></td>
                    </tr>
                    <tr className="line"></tr>
                    <tr className="line"></tr>
                    {inputIds.map((row, rowIndex) => (
                        <tr className="calcHeight" key={rowIndex}>
                            {row.map(id => (
                                <td key={id}>
                                    <input
                                        className="calcInput"
                                        type="number"
                                        id={id}
                                        name={id}
                                        value={inputs[id]}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr className="fiveHeight">
                        <td>
                            <button type="submit">
                                <img src="/images/equal.svg" alt="equal" className="calcHeight"/>
                            </button>
                        </td>
                        <td className="calcResult">
                            {result !== null && result}
                        </td>
                        <td>
                            <button onClick={clearFields}>
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