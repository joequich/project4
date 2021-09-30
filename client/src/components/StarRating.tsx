import React from 'react';
import { useState } from 'react';
import { StarIcon } from './icons/StarIcon';

const createArray = (length: number) => [...Array(length)];

export const StarRating = ({ style = {}, totalStars = 5}) => {
    const [selectedStars, setSelectedStars] = useState(0);
    return (
        <div style={{padding: '5px 0px', ...style}}>
            {createArray(totalStars).map((n, i) => (
                <StarIcon 
                    key={i}
                    selected={selectedStars>i}
                    onSelect={() => setSelectedStars(i+1)}
                />
            ))
            

            }
        </div>
    )
}
