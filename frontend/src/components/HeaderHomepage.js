import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import FakeSearchBox from '../components/FakeSearchBox'

const HeaderHomepage = () => {
    return (
        <>
           <div className="hero">
                <div className="overlay-img"></div>
                <div className="container hero-container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-12 hero-content">
                            <h4 className="fweight-400">- Find the best place for your vacation -</h4>
                            <h3 className="fweight-700">Discover great resorts</h3>
                            <Route render={({ history }) => <FakeSearchBox history={history}/>} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderHomepage