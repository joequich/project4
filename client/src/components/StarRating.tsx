import React from 'react';
import { useState } from 'react';
import { FiStar as StarIcon } from 'react-icons/fi';

const createArray = (length: number) => [...Array(length)];

export const StarRating = ({ style = {}, totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(0);
    return (
        <div style={{ padding: '5px 0px', ...style }}>
            {createArray(totalStars).map((n, i) => (
                <StarIcon
                    key={i}
                    fill={selectedStars > i ? '#78960D' : 'transparent'}
                    stroke={selectedStars > i ? '#78960D' : '#CDCDCD'}
                    onClick={() => setSelectedStars(i + 1)}
                />
            ))}
        </div>
    );
};
