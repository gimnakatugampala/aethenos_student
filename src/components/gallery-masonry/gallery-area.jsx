import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageLightBox from '../common/popup-modal/image-lightbox';

const gallery_images = [
    '/assets/images/gallery/gallery-10.jpg',
    '/assets/images/gallery/gallery-01.jpg',
    '/assets/images/gallery/gallery-06.jpg',
    '/assets/images/gallery/gallery-05.jpg',
    '/assets/images/gallery/gallery-08.jpg',
    '/assets/images/gallery/gallery-04.jpg',
    '/assets/images/gallery/gallery-09.jpg',
    '/assets/images/gallery/gallery-11.jpg',
    '/assets/images/gallery/gallery-07.jpg'
]

const GalleryArea = () => {
    // photoIndex
    const [photoIndex, setPhotoIndex] = useState(null);
    // image open state
    const [open, setOpen] = useState(false);
    // handleImagePopup
    const handleImagePopup = (index) => {
        setPhotoIndex(index)
        setOpen(true)
    }

    return (
        <>
            <div className="edu-gallery-area edu-section-gap">
                <div className="container">
                    <div id="masonry-gallery" className="gallery-grid-wrap">
                        <div id="animated-thumbnials" className="edublink-react-gallery-grid">
                            <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2,992:3 }} >
                                <Masonry gutter="30px">
                                    {gallery_images.map((img, i) => (
                                        <div key={i} onClick={() => handleImagePopup(i)} className="edu-popup-image edu-gallery-grid w-100 masonry-item" style={{ cursor: 'pointer' }}>
                                            <div className="thumbnail">
                                                <img className='w-100' src={img} alt="Gallery Image" />
                                            </div>
                                            <div className="zoom-icon">
                                                <i className="icon-69"></i>
                                            </div>
                                        </div>
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    </div>
                </div>
            </div>

            {/* image light box start */}
            <ImageLightBox images={gallery_images} open={open} setOpen={setOpen}
                photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
            {/* image light box end */}
        </>
    )
}

export default GalleryArea;