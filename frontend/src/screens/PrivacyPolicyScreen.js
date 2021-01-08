import React from 'react'
import MetaDecorator from '../components/MetaDecorator' 
import policyMeta from '../data/policy'

const PrivacyPolicyScreen = () => {
    return (
        <>
        <MetaDecorator 
                title={policyMeta.pageTitle} 
                description={policyMeta.pageDescription} 
                keywords={policyMeta.pageKeyword}
        />    
        
        </>
    )
}

export default PrivacyPolicyScreen
