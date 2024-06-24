import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './App.css';

import evnet_thumb from './assets/images/evnet_thumb.png';
import antdLogo from './assets/icons/antd.svg';
import muiLogo from './assets/icons/mui.svg';
import bootStrapLogo from './assets/icons/bootStrapLogo.svg';

const cardList = [
    {
        img: evnet_thumb,
        title: '이벤트 페이지',
        children: [
            { img: antdLogo, to: '/event/antd', library: 'Antd' },
            { img: muiLogo, to: '/event/mui', library: 'Mui' },
            { img: bootStrapLogo, to: '/event/bootstrap', library: 'BootStrap' },
        ],
    },
];

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firework();
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const firework = () => {
        var duration = 5 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(() => {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <article className="app__layout">
            <ul className="cards">
                {cardList.map((e, i) => (
                    <li key={`card-${i}`}>
                        <div className="card">
                            <img src={e.img} className="card__image" alt="" />
                            <div className="card__overlay">
                                <ul className="logo__list">
                                    {e.children.map((x, index) => (
                                        <Link to={x.to} key={`${x.library}-logo-${index}`}>
                                            <li className="logo">
                                                <img src={x.img} alt={`${x.library}-logo`} className="logo__image" />
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default App;
