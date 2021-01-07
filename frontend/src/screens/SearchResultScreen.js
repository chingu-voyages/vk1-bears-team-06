import React from 'react'
import { Route } from 'react-router-dom'
import ResultResortsList from '../components/ResultResortsList'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SearchBox from '../components/SearchBox'

const SearchResultScreen = ({ match }) => {
    
    const keywordInput = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const count = match.params.count 

    return (
        <>
            <HeaderBreadcrumb title="Search Results" />
            <Route render={({ history }) => <SearchBox keywordInput={keywordInput} history={history} pageNumber={pageNumber} count={count}/>} />
            <main className="body pt-80">
                    <div className="container">
                        <div className="row">
                            <div className="search-results">
                                <h4 className="fweight-600">Search Results: <span>{keywordInput}</span></h4>
                                <h5>{count} Results</h5>
                            </div>
                        <ResultResortsList keywordInput={keywordInput} pageNumber={pageNumber}/>
                            
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            </ul>
                        </nav>
                    </div>
                    </div>
                </main>
        </>
    )
}

export default SearchResultScreen
