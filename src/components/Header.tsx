import React from 'react';

const Header = () => {
    return (
        <div className='header'>
            <div className="header-img">
                <img src="/images/logo.svg" alt="" />
            </div>
            <p className='header-title'>Расписание <br/>и замены</p>
            <div className='header-developers'>
                <p>Разработчики:</p>
                <p>Короп А.А.</p>
                <p>Художники:</p>
                <p>Потетюнко М.Н.</p>
                <p>Пронина Д.А.</p>
            </div>
        </div>
    );
};

export default Header;