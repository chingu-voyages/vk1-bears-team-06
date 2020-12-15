import React from 'react'
import { Route } from 'react-router-dom'
import ResultResortsList from '../components/ResultResortsList'
import SearchBox from '../components/SearchBox'

const SearchResultScreen = ({ match }) => {

    const keywordInput = match.params.keyword

    return (
        <div>
             <h1>Search Result for: {keywordInput} </h1>
            <Route render={({ history }) => <SearchBox keywordInput={keywordInput} history={history}/>} />
            <ResultResortsList keywordInput={keywordInput}/>
        </div>
    )
}

export default SearchResultScreen
