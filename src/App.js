import React, { useState } from 'react';
import './App.css';
import utils from './utilities.js';
import PlayNumber from './components/PlayNumber.js';
import StarsDisplay from './components/StarsDisplay.js'

const App = () => {

  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

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

    const newCandidateNums = candidateNums.concat(number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNumbers = availableNums.filter(num => !newCandidateNums.includes(num));
      setAvailableNums(newAvailableNumbers);
      setCandidateNums([]);
      setStars(utils.randomSumIn(newAvailableNumbers, 9));
    }

  }

  return (
    <div className="game">  

      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>  

      <div className="body">
        <div className="left">
          <StarsDisplay count={stars}/>
        </div>

        <div className="right">
          {utils.range(1, 9).map(number => <PlayNumber 
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
