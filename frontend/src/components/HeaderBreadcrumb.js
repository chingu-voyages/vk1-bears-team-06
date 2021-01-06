import React from 'react' 

const HeaderBreadcrumb = (props) => {
    return (
        <>
           <div className="sub-hero">
                <div className="overlay-img"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-12">
                            <div className="sub-content">
                                <h3 className="fweight-500">{props.subtitle}</h3>
                                <h2 className="fweight-700">{props.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderBreadcrumb