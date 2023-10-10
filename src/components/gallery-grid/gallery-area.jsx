import React from 'react';
import { useState } from 'react';
import ImageLightBox from '../common/popup-modal/image-lightbox';

const gallery_items = [
    { img: '/assets/images/gallery/gallery-01.jpg', category: 'Education' },
    { img: '/assets/images/gallery/gallery-03.jpg', category: 'Education' },
    { img: '/assets/images/gallery/gallery-05.jpg', category: 'Education' },
    { img: '/assets/images/gallery/gallery-02.jpg', category: 'Marketing' },
    { img: '/assets/images/gallery/gallery-04.jpg', category: 'Marketing' },
    { img: '/assets/images/gallery/gallery-07.jpg', category: 'Development' },
    { img: '/assets/images/gallery/gallery-09.jpg', category: 'Development' },
    { img: '/assets/images/gallery/gallery-03.jpg', category: 'Health' },
    { img: '/assets/images/gallery/gallery-06.jpg', category: 'Health' },
    { img: '/assets/images/gallery/gallery-08.jpg', category: 'Health' }
]

const uniqueItems = gallery_items.filter( (arr, index, self) =>
    index === self.findIndex( ( i ) => ( i.img === arr.img && i.State === arr.State ) )
)

const uniq_categories = ['All', ...new Set( gallery_items.map( item => item.category ) ) ]

const GalleryArea = () => {
    const [items, setItems] = useState(uniqueItems);
    // category
    const [category, setCategory] = useState('All');
    // photoIndex
    const [photoIndex, setPhotoIndex] = useState(null);
    // image open state
    const [open, setOpen] = useState(false);
    // images
    const images = items.map(item => item.img)
    // handleCategory
    const handleCategory = (category) => {
        setCategory(category)
        if (category === 'All') {
            setItems(uniqueItems)
        } else {
            setItems(gallery_items.filter(item => item.category === category))
        }
    }
    // handleImagePopup
    const handleImagePopup = (index) => {
        setPhotoIndex(index)
        setOpen(true)
    }

    return (
        <>
            <div className="edu-gallery-area edu-section-gap">
                <div className="container">
                    <div className="isotope-wrapper">
                        <div className="isotop-button button-transparent isotop-filter">
                            {uniq_categories.map((c, i) => (
                                <button key={i} onClick={() => handleCategory(c)}
                                className={`${category === c ? 'is-checked' : ''}`}>
                                    <span className="filter-text">{c}</span>
                                </button>
                            ))}
                        </div>
                        <div className="isotope-list gallery-grid-wrap">
                            <div id="animated-thumbnials" className="edublink-react-gallery-grid">
                                <div className="row g-5">
                                    {items.map((item, i) => (
                                        <div key={i} className="col-lg-4 col-md-6" style={{ cursor: 'pointer' }}>
                                            <div onClick={()=> handleImagePopup(i)} className="edu-popup-image edu-gallery-grid w-100">
                                                <div className="thumbnail">
                                                    <img className='w-100' src={item.img} alt="Gallery Image" />
                                                </div>
                                                <div className="zoom-icon">
                                                    <i className="icon-69"></i>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* image light box start */}
            <ImageLightBox images={images} open={open} setOpen={setOpen}
                photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} />
            {/* image light box end */}
        </>
    )
}

export default GalleryArea;