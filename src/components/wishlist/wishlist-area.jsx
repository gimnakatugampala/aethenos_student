import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleWishlist from './single-wishlist';

const WishlistArea = () => {
    const { wishlist } = useSelector(state => state.wishlist);
    return (
        <section className="cart-page-area edu-section-gap">
            {wishlist.length === 0 && 
                <div className="container">
                    <div className="text-center">
                        <h3>No Wishlist Product</h3>
                        <Link href="/course-style-1">
                        <a className="edu-btn btn-medium">Return to courses</a>
                        </Link>
                    </div>
                </div>
            }
            {wishlist.length > 0 && 
                <div className="container">
                    <div className="table-responsive">
                        <table className="table cart-table wishlist-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="product-remove"></th>
                                    <th scope="col" className="product-thumbnail"></th>
                                    <th scope="col" className="product-title">Product Name</th>
                                    <th scope="col" className="product-price">Price</th>
                                    <th scope="col" className="product-status">Stock Status</th>
                                    <th scope="col" className="product-add-cart"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((item) => <SingleWishlist key={item.id} item={item} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </section>
    )
}

export default WishlistArea;