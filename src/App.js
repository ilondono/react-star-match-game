import React, { useState } from 'react';
import './App.css';
import utils from './utilities.js';
import PlayNumber from './components/PlayNumber.js';
import StarsDisplay from './components/StarsDisplay.js';
import PlayAgain from './components/PlayAgain.js';

const App = () => {

  const numbersIds = utils.range(1, 9);

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(numbersIds);
  const [candidateNums, setCandidateNums] = useState([]);

  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

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

    if (currentStatus === 'used') {
      return;
    }

    const newCandidateNums = currentStatus === 'available' 
        ? candidateNums.concat(number)       
        : candidateNums.filter(n => number !== n);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNumbers = availableNums.filter(num => !newCandidateNums.includes(num));
      setAvailableNums(newAvailableNumbers);
      setCandidateNums([]);
      setStars(utils.randomSumIn(newAvailableNumbers, 9));
    }
  }

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(numbersIds);
    setCandidateNums([]);
  }

  return (
    <div className="game">  

      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>  

      <div className="body">
        <div className="left">
          {
            gameIsDone 
            ? <PlayAgain onClick={resetGame}/>
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

      <div className="timer">Time Remaining: 10</div>
    </div>
  );
}

export default App;
