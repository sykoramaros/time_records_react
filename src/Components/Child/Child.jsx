import React from 'react';

const Child = ({kliknuti, najeti}) => {
    return (
        <div>
            <button onClick={kliknuti}>Click</button>
            <h2 onMouseOver={najeti}>Hover</h2>
        </div>
    );
};

export default Child;