import React from 'react'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import { BiLinkAlt  } from "react-icons/bi"
import { MdLocalPhone  } from "react-icons/md"
import { AiOutlineMail  } from "react-icons/ai"

import resorts from '../resorts'

const ResortDetail = ({ match }) => {
     
    const resortsList = resorts.find((resort) => resort._id === match.params.id)

    const { name, address, city, province, zip_code, image, description, amenities, website, phone, email } = resortsList

    return (
        <div className="row mt-5">
            <div className="col-lg-7">
            <h1>{name}</h1>
            <p><FaMapMarkerAlt /> {`${address}, ${city} ${province}, Philippines, ${zip_code}`}</p>
            <img src={image} alt={name} width="700" />
            <br/>
            <p>{description}</p>
            <br/>
            <h4>Amenities:</h4>
  <div>
  { 
                  Object.entries(amenities).map(
                    ([key, value]) => {
                        if(value){
                            return <p>{key}</p>
                        }
                       return null
                    }
                )
               }
            </div> 
        </div>

        <div className="col-lg-4">
        <div className="card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item"><BiLinkAlt /> <a href={ website ? website : ''}>{ website ? website : 'No website provided'}</a> </li>
                <li className="list-group-item"><MdLocalPhone /> { phone ? phone : 'No phone number' }</li>
                <li className="list-group-item"><AiOutlineMail /> <a href={`mailto:${email}`}>{ email ? email : 'No email provided' }</a> </li>
            </ul>
        </div>
        </div>


        </div>
    ) 
}

export default ResortDetail