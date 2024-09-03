import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SingleWishlist from "./single-wishlist";

const WishlistArea = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <section className="cart-page-area edu-section-gap">
      {wishlist.length === 0 && (
        <div className="container py-5">
          <h3>No Wishlist Product</h3>
          <div className="update-btn">
            <Link href="/" style={{ cursor: 'pointer' }}  className="edu-btn btn-border btn-medium disabled">
              Return to Home
            </Link>
          </div>
        </div>
      )}
      {wishlist.length > 0 && (
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-table wishlist-table">
              <thead>
                <tr>
                  <th scope="col" className="product-remove"></th>
                  <th scope="col" className="product-thumbnail"></th>
                  <th scope="col" className="product-title">
                    Product Name
                  </th>
                  <th scope="col" className="product-price">
                    Price
                  </th>
                  <th scope="col" className="product-add-cart"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <SingleWishlist key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default WishlistArea;
