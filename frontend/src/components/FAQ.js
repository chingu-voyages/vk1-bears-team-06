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
                                <p className="desc">Iko strives to be the most trusted review site for resorts. Here are the most frequently asked questions.</p>
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
                                    question = "What is IKO?"
                                    answer = "IKO is the new way to connect with people from around the Philippines through sharing your vacation experiences."
                                />
                                <AccordionItem 
                                    eventKey = '1'
                                    question = "Who can add resorts to be reviewed?"
                                    answer = "Anyone who would like to add resorts should register as a resort owner."
                                />
                                <AccordionItem 
                                    eventKey = '2'
                                    question = "How do I leave a review?"
                                    answer = "You should register as a reviewer. Login to the site, search for the resort you would like to review, and scroll down to the review form. Voila!"
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