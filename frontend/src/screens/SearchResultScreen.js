import React from 'react'
import { Route } from 'react-router-dom'
import ResultResortsList from '../components/ResultResortsList'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SearchBox from '../components/SearchBox'


const SearchResultScreen = ({ match }) => {
    
    const keywordInput = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    return (
        <div>
            <HeaderBreadcrumb />
             <h1>Search Result for: {keywordInput} </h1>
            <Route render={({ history }) => <SearchBox keywordInput={keywordInput} history={history}/>} />
            <ResultResortsList keywordInput={keywordInput} pageNumber={pageNumber}/>
        </div>
    )
}

export default SearchResultScreen
