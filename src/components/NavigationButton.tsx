import React, {FC, ImgHTMLAttributes} from 'react';

interface INavigationButton extends ImgHTMLAttributes<HTMLImageElement> {
    onClick: ()=>void;
}

const NavigationButton: FC<INavigationButton> = ({src,alt,onClick,className}) => {
    return (
        <button onClick={onClick} className="bloc-icon" style={{padding: '2vw'}}>
            <img src={src} alt={alt} className={className}/>
        </button>
    );
};

export default NavigationButton;