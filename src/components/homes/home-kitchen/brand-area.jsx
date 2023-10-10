import React from 'react';

function Brand({ img }) {
    return (
        <div className="brand-grid" data-sal-delay="450" data-sal="slide-up" data-sal-duration="1000">
            <img src={`/assets/images/brand/brand-${img}.png`} alt="Brand Logo" />
        </div>
    )
}

const BrandArea = () => {
    return (
        <div className="edu-brand-area brand-area-3">
            <div className="container">
                <div className="brand-grid-wrap brand-style-3">
                    <Brand img={'09'} />
                    <Brand img={'10'} />
                    <Brand img={'11'} />
                    <Brand img={'12'} />
                    <Brand img={'13'} />
                </div>
            </div>
        </div>
    )
}

export default BrandArea;