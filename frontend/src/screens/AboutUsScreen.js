import React from 'react'
import MetaDecorator from '../components/MetaDecorator'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import aboutMeta from '../data/about'

const AboutUsScreen = () => {
    return (
        <>
        <MetaDecorator 
                title={aboutMeta.pageTitle} 
                description={aboutMeta.pageDescription} 
                keywords={aboutMeta.pageKeyword}
        />    
        <HeaderBreadcrumb title="About Us" />
            <div className="container template">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 col-md-12">
                        
                    </div>
                    <div className="col-lg-10 offset-lg-1 col-md-12">
                        <div className="temp-body">
                            <p>IKO is the new way to connect with people from around the world through sharing your vacation experiences. With IKO, you can write your own reviews or read hundreds of other travelers' reviews and stories. To get started, you can add your destination by choosing from one of our featured destinations, or add any location in the world. IKO will then give you a chance to share your favorite resort photos and review what makes it a great place to visit!
                            </p>
                            <br/>
                            <p>A new media platform that allows travellers to create and share crowd-sourced reviews about resorts, hotels, villas and apartments. It also provides a search engine that allows users to find information about their desired accommodation by filtering on different criteria like price range, amenities offered etc. IKO is based in Malta (Europe) but has a worldwide audience.</p>
                            <br/>
                            <p>Platform that allows users to publish crowd-sourced reviews about resorts. IKO takes the best parts of websites like TripAdvisor and combines it with the interactive nature of Yelp to create a community that shares objective, crowd-sourced reviews about resorts and hotels.</p>
                            <br/>
                            <p>IKO is a free, crowd-sourced reviews platform for resorts. We help you build a network of friends who share your interests and experience so you can find the perfect place to vacation. From luxury resorts to budget hotels, we have you covered.</p>
                            <br/>
                            <p>A site for resorts, hotels and other locations where people want to share their opinions. We provide an easy way to publish crowd-sourced reviews about your resort. They can be any length, in any language and cover any topic related to the resort or hotel.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUsScreen
