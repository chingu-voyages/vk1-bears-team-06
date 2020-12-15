import React from 'react'
import PopularResortList from '../components/PopularResortsList'
import { Route } from 'react-router-dom'
import FakeSearchBox from '../components/FakeSearchBox'


const HomeScreen = () => {
    return (
        <div className="container">
            <Route render={({ history }) => <FakeSearchBox history={history}/>} />
            <h1>Home Screen</h1>
            <PopularResortList />
        </div>
    )
}

export default HomeScreen