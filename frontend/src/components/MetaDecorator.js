import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const MetaDecorator = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>IKO - Discover Great Resorts | {title} </title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired
}

export default MetaDecorator
