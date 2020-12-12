import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
           <footer>
                <div class="container">
                    <div class="row footer-top">
                        <div class="col-md-4 col-sm-12">
                        <Link class="navbar-brand" href="#">IKO</Link>
                        </div>
                        <div class="col-md-8 col-sm-12 footer-nav">
                        <nav>
                            <ul>
                                <li>
                                    <Link href="#">Home</Link>
                                </li>
                                <li>
                                    <Link href="#">Resort Details</Link>
                                </li>
                                <li>
                                    <Link href="#">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    <hr />
                    <div class="row">
                        <div class="col-md-12 footer-bot">
                        <p>Copyright @ 2020 IKO by Bears Team 6 of Kodigo Code Camp</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer