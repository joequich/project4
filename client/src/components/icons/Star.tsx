import React from 'react'
import { MouseEventHandler } from 'react';
import { FiStar } from 'react-icons/fi';

export const Star = ({selected = false, onSelect }: { selected:boolean, onSelect: MouseEventHandler<SVGElement>}) => {
    return (
        <FiStar fill={selected ? '#78960D' : 'transparent'} stroke={selected ? '#78960D' : '#CDCDCD'}  onClick={onSelect} />
    )
}
