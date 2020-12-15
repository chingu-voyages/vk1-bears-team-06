import React, { useState } from 'react'

const SearchBox = ({ history, keywordInput }) => {
    const [keyword, setKeyword] = useState(keywordInput)

   const submitHandler = (e) => {
       if(keyword.trim()){
           history.push(`/search/${keyword}`)
       } else {
           history.push('/')
       }
   }

    return (
        <>
           <div className="col-lg-4">
               <form onSubmit={submitHandler} className="form-inline">
                    <input className="form-control mr-sm-2" value={keyword} type="search" name='q' placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value)} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
           </div>
      </>
    )
}

export default SearchBox
