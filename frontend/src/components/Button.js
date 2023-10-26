import React from 'react';
import '../styles/Button.css';
import { useState, useEffect } from "react";


const Button = ({ text }) => {

    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((button) => {
                button.classList.remove('active');
            });
            button.classList.add('active');
        });
    });

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <button
            className={isActive ? 'active' : ''}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default Button;





