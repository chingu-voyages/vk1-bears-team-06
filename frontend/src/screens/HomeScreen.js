import React from 'react'
import PopularResortList from '../components/PopularResortsList';

// import heroImg from '../assets/images/hero.png';

const HomeScreen = () => {
    return (
        <>
        <div class="header">
            <div class="img-overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="header-card">
                        <h2>The wave crashed and hit the sandcastle head-on.</h2>
                        <p>The wave crashed and hit the sandcastle head-on. The sandcastle began to melt under the waves force and as the wave receded, half the sandcastle was gone.</p>
                        <div class="form-container">
                        <form action="#">
                            <input type="text" class="form-control" placeholder="Search for resorts"/>
                            <button>
                                <img src='#' alt="Search" />
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="most-popular section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-sm-12 title-section">
                        <h2>Most Popular Spots.</h2>
                        <p>He watched as the young man tried to impress everyone in the room with his intelligence.</p>
                    </div>
                </div>

                <PopularResortList />

                <div class="row">
                    <div class="col-md-12 more">
                        <button class="btn btn-main">Search more resorts</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="iko-steps section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 col-sm-12 title-section">
                    <h2>The IKO benefits.</h2>
                    </div>
                </div>
                <div class="row list">
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Search"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Trophy"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Eye"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Sunrise"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Palm Tree"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
                    <img src="#" alt="Life Guard"/>
                    <h4 class="title">Expertly designed</h4>
                    <p>Statement-making homes with exceptionally styled interiors.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="about section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 title-section">
                    <h2>What is IKO?</h2>
                    <p>There was a time when he would have embraced the change that was coming. In his youth, he sought adventure and the unknown, but that had been years ago. He wished he could go back and learn to find the excitement that came with change but it was useless. That curiosity had long left him to where he had come to loathe.</p>
                    </div>
                    <div class="col-lg-12">
                    <img src="#" alt="Resort"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="newsletter section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3 col-md-12 title-section">
                    <h2>Get the latest picks.</h2>
                    <p>Subscribe to our mailing list and be first to check out the hottest vacation spots voted in the Philippines</p>
                    </div>
                    <div class="col-lg-6 offset-lg-3 col-md-12">
                    <div class="form-container">
                        <form action="#">
                            <input type="email" class="form-control" placeholder="Enter your email address"/>
                            <button>
                                <img src="#" alt="Send email address"/>
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeScreen