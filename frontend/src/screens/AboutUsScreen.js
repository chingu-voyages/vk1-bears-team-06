import React from 'react'
import MetaDecorator from '../components/MetaDecorator' 
import aboutMeta from '../data/about'

const AboutUsScreen = () => {
    return (
        <>
        <MetaDecorator 
                title={aboutMeta.pageTitle} 
                description={aboutMeta.pageDescription} 
                keywords={aboutMeta.pageKeyword}
        />    
        
        </>
    )
}

export default AboutUsScreen
