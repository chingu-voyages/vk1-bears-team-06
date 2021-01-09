import React from 'react'
import { Route } from 'react-router-dom'
import ResultResortsList from '../components/ResultResortsList'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SearchBox from '../components/SearchBox'
import MetaDecorator from '../components/MetaDecorator' 
import searchMeta from '../data/search'

const SearchResultScreen = ({ match }) => {
    
    const keywordInput = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const count = match.params.count 

    return (
        <>
          <MetaDecorator 
              title={searchMeta.pageTitle} 
              description={searchMeta.pageDescription} 
              keywords={searchMeta.pageKeyword}
          />   
            <HeaderBreadcrumb title="Search Results" />
            <Route render={({ history }) => <SearchBox keywordInput={keywordInput} history={history} pageNumber={pageNumber} count={count}/>} />
            <main className="body pt-80">
                    <div className="container">
                        <div className="row">
                            <div className="search-results">
                                <h4 className="fweight-600">Search Results: <span>{keywordInput}</span></h4>
                              
                            </div>
                        <ResultResortsList keywordInput={keywordInput} pageNumber={pageNumber}/>
                            
                    </div>
                    </div>
                </main>
        </>
    )
}

export default SearchResultScreen
