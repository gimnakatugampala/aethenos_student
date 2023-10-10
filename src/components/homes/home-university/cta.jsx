import React from 'react';

const Cta = () => {
    return (
        <div className="cta-area-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="edu-cta-box cta-style-2 bg-image bg-image--9">
                            <div className="inner">
                                <div className="content text-end">
                                    <span className="subtitle">Get In Touch:</span>
                                    <h3 className="title">
                                        <a href="mailto:info@edublink">info@edublink</a>
                                    </h3>
                                </div>
                                <div className="sparator">
                                    <span>or</span>
                                </div>
                                <div className="content">
                                    <span className="subtitle">Call Us Via:</span>
                                    <h3 className="title">
                                        <a href="tel:+011235641231">+01 123 5641 231</a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cta;