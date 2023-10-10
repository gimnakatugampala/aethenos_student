import Link from 'next/link';
import React from 'react';

const ProductDetailsArea = ({ item }) => {
    return (
        <div className="product-details-area gap-top-equal">
            <div className="container">
                <div className="row g-5 row--25">
                    <div className="col-lg-6">
                        <div className="thumbnail">
                            <img src={item?.img} alt="Product Images" className='w-100' />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="content">
                            <h3 className="title">{item?.title}</h3>
                            <div className="product-rating">
                                <div className="rating">
                                    {item?.rating?.map(r => <i key={r} className="icon-23"></i>)}
                                </div>
                                <span className="rating-count">(3)</span>
                            </div>

                            <div className="price">$70.30</div>

                            <p>{item?.desc}</p>

                            <div className="product-action">
                                <div className="edu-quantity-btn">
                                    <div className="pro-qty"><span className="dec qtybtn">-</span>
                                        <input type="text" defaultValue="1" />
                                        <span className="inc qtybtn">+</span>
                                    </div>
                                </div>

                                <div className="add-to-cart-btn">
                                    <Link href="/cart">
                                        <a className="edu-btn btn-medium">Add To Cart</a>
                                    </Link>
                                    <a href="#" className="wishlist-btn"><i className="icon-22"></i></a>
                                </div>
                            </div>

                            <ul className="product-feature">
                                <li><span>SKU:</span> {item?.sku}</li>
                                <li><span>Categories: </span> <a href="#">Book</a> </li>
                                <li><span>Tag: </span> <a href="#">Business</a> <a href="#">Administration</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsArea;