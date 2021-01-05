import React from 'react'
import { Accordion } from 'react-bootstrap'
import AccordionItem from '../components/AccordionItem'
import FAQimg1 from '../assets/images/img3.jpg'
import FAQimg2 from '../assets/images/img4.jpg'

const FAQ = () => {
    return (
        <>
           <div className="faq pt-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 title-card-container">
                            <div className="title">
                                <p className="fweight-700 subtitle">Frequently Asked Questions</p>
                                <h3 className="fweight-700">Have Any Questions?</h3>
                                <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa pariatur aliquid corrupti cupiditate rem reprehenderit, alias deleniti.</p>
                                <div className="row faq-img">
                                    <div className="col-lg-6 col-sm-6">
                                        <img src={FAQimg1} alt="Resort" />
                                    </div>
                                    <div className="col-lg-6 col-sm-6">
                                        <img src={FAQimg2} alt="Resort" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 accordion-container">
                            <Accordion className="accordion accordion-flush" id="accordionFlushExample" defaultActiveKey="0">

                                <AccordionItem 
                                    eventKey = '0'
                                    question = "Accordion 1"
                                    answer = "They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind."
                                />
                                <AccordionItem 
                                    eventKey = '1'
                                    question = "Accordion 2"
                                    answer = "He sat across from her trying to imagine it was the first time. It wasn't. Had it been a hundred? It quite possibly could have been. Two hundred? Probably not. "
                                />
                                <AccordionItem 
                                    eventKey = '2'
                                    question = "Accordion 3"
                                    answer = "It was just a burger. Why couldn't she understand that? She knew he'd completely changed his life around her eating habits, so why couldn't she give him a break this one time? "
                                />

                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQ