import React, { useState } from 'react';
import App from './App.js';

const StartMatch = () => {
    const [gameId, setGameId] = useState(1);
    return <App key={gameId} startNewGame={() =>setGameId(gameId + 1)} />
}

export default StartMatch;