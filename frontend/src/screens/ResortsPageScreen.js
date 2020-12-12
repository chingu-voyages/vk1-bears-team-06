import React from 'react'
import PopularResortList from '../components/PopularResortsList'

const ResortsPageScreen = () => {
    return (
        <>
        <div class="mini-header">
            <div class="img-overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                    <div class="title-section">
                        <h2>Most Popular Spots.</h2>
                        <p>He watched as the young man tried to impress everyone in the room with his intelligence.</p>
                    </div>
                    <div class="form-container">
                        <form action="#">
                            <input type="text" class="form-control" placeholder="Search for resorts"/>
                            <button>
                                <img src="#" alt="Search"/>
                            </button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container section">
            <div class="row">
                <PopularResortList />
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
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

export default ResortsPageScreen