import React from 'react'
import Resort from './Resort'
import resorts from '../resorts'

const PopularResortsList = () => {
    return (
        <> 
         { resorts.map(resort => <Resort resort={resort} />) }
               
        </>
    )
}

export default PopularResortsList