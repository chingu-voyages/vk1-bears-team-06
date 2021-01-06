import React, { useState } from 'react'

const SearchBox = ({ history, keywordInput, pageNumber, count }) => {

    const [keyword, setKeyword] = useState(keywordInput)

   const submitHandler = (e) => {
       if(keyword.trim()){
           history.push(`/search/${keyword}/page/${pageNumber}/count/${count}`)
       } else {
           history.push('/')
       }
   }

    return (
        <>
           <div className="search">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-12">
                    <label className="fweight-600">Search for your favorite resort spots</label>
                    <div className="search-bar-container">
                        <form onSubmit={submitHandler}>
                            <input className="search-resort"placeholder="Search" value={keyword} type="search" name='q' aria-label="Search" onChange={(e) => setKeyword(e.target.value)}/> 
                            <button type="submit">SEARCH</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

      </>
    )
}

export default SearchBox
