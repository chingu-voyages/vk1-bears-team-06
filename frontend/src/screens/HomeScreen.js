import React from 'react'
import MetaDecorator from '../components/MetaDecorator' 
import PopularResortList from '../components/PopularResortsList'
import HeaderHomepage from '../components/HeaderHomepage'
import Showcase from '../components/Showcase'
import Counters from '../components/Counters'
import FAQ from '../components/FAQ'
import Subscription from '../components/Subscription'
import homeMeta from '../data/home'


const HomeScreen = () => {
    return (
        <>
           <MetaDecorator 
                title={homeMeta.pageTitle} 
                description={homeMeta.pageDescription} 
                keywords={homeMeta.pageKeyword}
            />         
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