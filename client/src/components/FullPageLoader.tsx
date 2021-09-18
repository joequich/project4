import React from 'react'
import { Spinner } from './icons/Spinner'

export const FullPageLoader = () => {
    return (
        <div className="loading-100full">
            <Spinner/>
        </div>
    )
}
