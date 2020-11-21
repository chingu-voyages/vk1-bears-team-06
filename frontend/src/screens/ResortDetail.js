import React from 'react'
import resorts from '../resorts'

const ResortDetail = ({ match }) => {
     
    const resortsList = resorts.find((resort) => resort._id === match.params.id)

    return (
        <div>
           <h1>{resortsList.name}</h1>
        </div>
    )
}

export default ResortDetail