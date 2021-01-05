import React, { useState } from 'react'
// import {ReactComponent as SearchIcon} from '../assets/images/svg/search.svg';

const FakeSearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

   const submitHandler = (e) => {
       e.preventDefault()
       if(keyword.trim()){
           history.push(`/search/${keyword}`)
       } else {
           history.push('/')
       }
   }

    return (
        <>
        <div className="search-bar-container">
            <form onSubmit={submitHandler}>
                <input type="search" name='q' className="search-resort"
                    placeholder="Search for your favorite resort spots" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} />
                <button type="submit">
                    {/* <SearchIcon /> */}
                    SEARCH</button>
            </form>
        </div>
      </>
    )
}

export default FakeSearchBox
