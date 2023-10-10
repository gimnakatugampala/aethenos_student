import Link from 'next/link';
import React from 'react';
import { shop_data } from '../../data';

const ShopArea = () => {
    return (
        <section className="shop-page-area section-gap-equal">
            <div className="container">
                <div className="edu-sorting-area">
                    <div className="sorting-left">
                        <h6 className="showing-text">We found <span>71</span> courses available for you</h6>
                    </div>

                    <div className="sorting-right">
                        <div className="edu-sorting">
                            <div className="icon"><i className="icon-55"></i></div>
                            <select className="edu-select">
                                <option>Filters</option>
                                <option>Low To High</option>
                                <option>High To Low</option>
                                <option>Last Viewed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row g-5">
                    {shop_data.map((product) => {
                        const { id, img, delay, price, rating, title, total_rating } = product;
                        return (
                            <div key={id} className="col-lg-3 col-md-4 col-sm-6" data-sal-delay={delay}
                                data-sal="slide-up" data-sal-duration="800">
                                <div className="edu-product">
                                    <div className="inner">
                                        <div className="thumbnail">
                                            <Link href={`/product-details/${id}`}>
                                                <a>
                                                    <img src={img} alt="Shop Images" />
                                                </a>
                                            </Link>
                                            <div className="product-hover-info">
                                                <ul>
                                                    <li><a href="#" role="button"><i className="icon-2"></i></a></li>
                                                    <li>
                                                        <Link href="/wishlist">
                                                        <a><i className="icon-22"></i></a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/cart">
                                                        <a><i className="icon-3"></i></a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="content">
                                            <h6 className="title">
                                                <Link href={`/product-details/${id}`}>
                                                    <a>{title}</a>
                                                </Link>
                                            </h6>

                                            <div className="product-rating">
                                                <div className="rating">
                                                    {rating.map(r => <i key={r} className="icon-23"></i>)}
                                                </div>
                                                <span className="rating-count">{(total_rating)}</span>
                                            </div>
                                            <div className="price">${price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <ul className="edu-pagination pt--50">
                    <li><a href="#" aria-label="Previous"><i className="icon-west"></i></a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li className="more-next"><a href="#"></a></li>
                    <li><a href="#">8</a></li>
                    <li><a href="#" aria-label="Next"><i className="icon-east"></i></a></li>
                </ul>
            </div>
        </section>
    )
}

export default ShopArea;