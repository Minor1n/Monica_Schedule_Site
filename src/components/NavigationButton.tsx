import React, {FC, ImgHTMLAttributes} from 'react';

interface INavigationButton extends ImgHTMLAttributes<HTMLImageElement> {
    onClick: ()=>void;
    padding: number;
}

const NavigationButton: FC<INavigationButton> = ({src,alt,onClick,className,padding}) => {
    return (
        <button onClick={onClick} className="bloc-icon" style={{padding: `2vw ${padding}vw`}}>
            <img src={src} alt={alt} className={className}/>
        </button>
    );
};

export default NavigationButton;