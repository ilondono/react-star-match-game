import React from 'react';
import colors from '../colors.js';

const PlayNumber = (props) => {

    return(
        <button className="number"
                style={{backgroundColor:colors[props.status]}}
                onClick={() => props.onClick(props.number, props.status)}>
            {props.number}
        </button>
    );
}

export default PlayNumber;