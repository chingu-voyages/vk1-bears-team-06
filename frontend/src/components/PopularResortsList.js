  
import React from 'react'
import Resort from './Resort'
import resorts from '../resorts'

const PopularResortsList = () => {
    return (
        <> 
    <div className="row">
         { resorts.map(resort => <Resort resort={resort} />) }
     </div>
        </>
            
    )
}

export default PopularResortsList