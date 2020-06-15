import React from 'react';
import utils from '../utilities.js';

const StarsDisplay = (props) => {
    return(
        <>
            {utils.range(1, props.count).map(starId => <div key={starId} className="star"/>)}            
        </>
    );
}

export default StarsDisplay;