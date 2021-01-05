import React from 'react'
import { Link } from 'react-router-dom'
import LogoFooter from '../assets/images/svg/logo-footer.svg';

const Subscription = () => {
    return (
        <>
           <div class="subscription">
                <div class="overlay-img"></div>
                <div class="container">
                    <div class="col-lg-6 offset-lg-3 col-sm-12 title-card-container">
                        <div class="title">
                            <h3 class="fweight-700">Get The Latest Picks</h3>
                            <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa pariatur aliquid corrupti cupiditate rem reprehenderit, alias deleniti.</p>
                            <div class="search-bar-container">
                                <form action="#">
                                    <input type="text" class="search-resort"
                                        placeholder="Your email address" />
                                    <button type="submit">SUBSCRIBE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription
