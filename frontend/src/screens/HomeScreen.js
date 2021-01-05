import React from 'react'
import PopularResortList from '../components/PopularResortsList'
import HeaderHomepage from '../components/HeaderHomepage'
import Showcase from '../components/Showcase'
import Counters from '../components/Counters'
import FAQ from '../components/FAQ'
import Subscription from '../components/Subscription'

const HomeScreen = () => {
    return (
        <>
            <HeaderHomepage />
            <Showcase />
            <PopularResortList />
            <Counters />
            <FAQ />
            <Subscription />
        </>
    )
}

export default HomeScreen