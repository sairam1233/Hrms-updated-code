import React from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import './index.css';

const Home = () => {
    const loginDate = Cookies.get('loginDate');
    const loginTime = Cookies.get('loginTime');

    return (
        <div>
            {loginTime && loginDate && (
                <p className='home-container-p'>
                    <span className='span-p'>Last login: </span>{loginDate} {loginTime}
                </p>
            )}
            <h1 className='home-container-h1'>Welcome!</h1>
        </div>
    );
};

export default Home;
