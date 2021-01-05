import React from 'react'
import LoupeIcon from '../assets/images/svg/loupe.svg';
import TrophyIcon from '../assets/images/svg/trophy.svg';
import EyeIcon from '../assets/images/svg/eye.svg';
import SecurityIcon from '../assets/images/svg/security.svg';

const Showcase = () => {
    return (
        <>
           <div className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12 title-card-container">
                            <div className="title">
                                <p className="fweight-700 subtitle">About IKO</p>
                                <h3 className="fweight-700">Discover Destinations in the Philippines</h3>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 title-card-container">
                            <p>The words hadn't flowed from his fingers for the past few weeks. He never imagined he'd find himself with writer's block, but here he sat with a blank screen in front of him. That blank screen taunting him day after day had started to play with his mind. </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="iko-steps">
                <div className="container">
                    <div className="row list">
                        <div className="col-lg-3 col-sm-6 col-xs-12 item">
                            <img src={LoupeIcon} alt="Loupe" />
                            <h4 className="title">Best Finds</h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xs-12 item">
                            <img src={TrophyIcon} alt="Trophy" />
                            <h4 className="title">Expertly designed</h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xs-12 item">
                            <img src={EyeIcon} alt="Eye" />
                            <h4 className="title">Eye catching</h4>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xs-12 item">
                            <img src={SecurityIcon} alt="Eye" />
                            <h4 className="title">Secured</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showcase