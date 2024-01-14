import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [render, forceRender] = useState(0);
    const count = useRef();


    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
        count.current.innerHTML = parseInt(count.current.innerHTML, 10) + 1
    };

    return (
        <div>
            <p>This component has rendered <span ref={count}>0</span> times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};