import React from 'react'
import MetaDecorator from '../components/MetaDecorator' 
import termsMeta from '../data/terms'

const TermsAndConditionsScreen = () => {
    return (
        <>
        <MetaDecorator 
                title={termsMeta.pageTitle} 
                description={termsMeta.pageDescription} 
                keywords={termsMeta.pageKeyword}
        />    
        
        </>
    )
}

export default TermsAndConditionsScreen
