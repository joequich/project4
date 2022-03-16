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
                    fill={selectedStars > i ? '#0E8937' : 'transparent'}
                    stroke={selectedStars > i ? '#0E8937' : '#CDCDCD'}
                    onClick={() => setSelectedStars(i + 1)}
                />
            ))}
        </div>
    );
};
