import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, keywordInput = '' }) => {
    return pages > 1 && (
        <>
            <nav aria-label="Page navigation example">
            <ul className="pagination">
                {[...Array(pages).keys()].map(x => (
                   <li className={`page-item ${x+1 === page ? 'active' : ''} `} key={x + 1}>
                       <Link to={keywordInput ? `/search/${keywordInput}/page/${x+1}` : `/page/${x+1}`} className="page-link">{x+1}</Link>
                  </li>
                )) }

               
            </ul>
            </nav>
        </>
    )
}

export default Paginate
