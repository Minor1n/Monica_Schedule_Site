import React from 'react';
import INavigation from "@interfaces/components/INavigation";

const Navigation: React.FC<INavigation> = ({children,className}) => {
    return (
        <nav className={"mobile-nav " + className}>
            {children}
        </nav>
    );
};

export default Navigation;