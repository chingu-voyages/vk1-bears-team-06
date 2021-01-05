import React from 'react'
import { Accordion } from 'react-bootstrap'
import InfoIcon from '../assets/images/svg/information.svg';


const AccordionItem = (props) => {
    return (
        <>
            <div className="accordion-item">
                <Accordion.Toggle className="accordion-header" id="flush-headingOne" eventKey={props.eventKey}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne" aria-expanded="false"
                        aria-controls="flush-collapseOne">
                        <img src={InfoIcon} alt="Info Icon" />
                        {props.question}
                    </button>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={props.eventKey} id="flush-collapseOne" className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">{props.answer}</div>
                </Accordion.Collapse>
            </div>
        </>
    )
}

export default AccordionItem