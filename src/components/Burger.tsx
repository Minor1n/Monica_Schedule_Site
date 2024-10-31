import React, {FC, ReactElement, ReactNode} from 'react';
import '@styles/burger.css'

interface IBurger {
    children: ReactNode|ReactElement;
    length:number;
    className:string;
}

const Burger: FC<IBurger> = ({children,length,className}) => {
    return (
        <div className={`burgerMain ${className}`} style={{height: `${length*12}vw`}}>
            {children}
        </div>
    );
};

export default Burger;