import React from 'react'
import Numbers from '../components/Numbers'

const Counters = () => {
    return (
        <>
           <div className="counter pt-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 title-card-container">
                            <div className="title">
                                <p className="fweight-500 subtitle">Counters</p>
                                <h3 className="fweight-700">Our Numbers</h3>
                            </div>
                        </div>
                        <Numbers 
                            numbers = "1209" 
                            title = "Users" 
                        />
                        <Numbers 
                            numbers = "600" 
                            title = "Resorts" 
                        />
                        <Numbers 
                            numbers = "2000" 
                            title = "Reviews" 
                        />
                        <Numbers 
                            numbers = "250" 
                            title = "Something" 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counters