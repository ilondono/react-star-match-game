import React, { useState, useEffect } from 'react';
import './App.css';
import utils from './utilities.js';
import PlayNumber from './components/PlayNumber.js';
import StarsDisplay from './components/StarsDisplay.js';
import PlayAgain from './components/PlayAgain.js';

const numbersIds = utils.range(1, 9);

// custom hook
const useGameState = () => {

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(numbersIds);
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft ] = useState(10);

  useEffect(() => {

    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
   if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNumbers = availableNums.filter(num => !newCandidateNums.includes(num));
      setAvailableNums(newAvailableNumbers);
      setCandidateNums([]);
      setStars(utils.randomSumIn(newAvailableNumbers, 9));      
    }
  }

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

const App = (props) => {

  const { stars, 
          availableNums, 
          candidateNums, 
          secondsLeft, 
          setGameState 
        } = useGameState();

  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {

    if (currentStatus === 'used' || gameStatus !== 'active') {
      return;
    }

    const newCandidateNums = currentStatus === 'available' 
        ? candidateNums.concat(number)       
        : candidateNums.filter(n => number !== n);

    setGameState(newCandidateNums);
   
  }

  return (
    <div className="game">  

      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>  

      <div className="body">
        <div className="left">
          {
            gameStatus !== 'active' 
            ? <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus}/>
            : <StarsDisplay count={stars}/>
          }
          
        </div>

        <div className="right">
          {numbersIds.map(number => <PlayNumber 
                                            key={number} 
                                            number={number} 
                                            status={numberStatus(number)}
                                            onClick={onNumberClick}
                                      />)}
        </div>

      </div>

      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
}

export default App;
