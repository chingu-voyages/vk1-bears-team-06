  
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Resort from './Resort'


const PopularResortsList = () => {
    const [resorts, setResorts] = useState([])

    useEffect(() => {
       const fetchResorts = async () => {
           const { data } = await axios.get('/api/resorts')
           setResorts(data)
       }

       fetchResorts()
    }, [])

    return (
        <> 
    <div className="row">
        { resorts.map(resort => <Resort key={resort._id} resort={resort} />) }
     </div>
        </>
            
    )
}

export default PopularResortsList