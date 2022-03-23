import { useState } from 'react';
import { FiStar as StarIcon } from 'react-icons/fi';

const createArray = (length: number) => [...Array(length)];

export const StarRating = ({ style = {}, totalStars = 5 }) => {
    const [selectedStars, setSelectedStars] = useState(0);
    return (
        <div style={{ padding: '0px', ...style }}>
            {createArray(totalStars).map((n, i) => (
                <StarIcon
                    key={i}
                    fill={selectedStars > i ? '#B44D9E' : 'transparent'}
                    stroke={selectedStars > i ? '#B44D9E' : '#c7c7cc'}
                    onClick={() => setSelectedStars(i + 1)}
                />
            ))}
        </div>
    );
};
