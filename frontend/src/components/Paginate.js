import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, keywordInput = '', resortOwnerId = ''}) => {

    const pathname = window.location.pathname 
    const matchPath = pathname.split('/')

    return pages > 1 && (
        <>
            <nav aria-label="Page navigation example">
            <ul className="pagination">
                {[...Array(pages).keys()].map(x => (
                   <li className={`page-item ${x+1 === page ? 'active' : ''} `} key={x + 1}>
                       { matchPath === '' || matchPath.includes('search') ?  
                        <Link to={keywordInput ? `/search/${keywordInput}/page/${x+1}` : null} className="page-link">{x+1}</Link>
                        : matchPath.includes('admin') ? 
                        <Link to={ `/admin/resortsList/page/${x+1}`} className="page-link">{x+1}</Link> 
                        :  <Link to={ `/resort-owner/${resortOwnerId}/resortsList/page/${x+1}`} className="page-link">{x+1}</Link> 
                    }
                      
                  </li>
                )) }
            </ul>
            </nav>
        </>
    )
}

export default Paginate
