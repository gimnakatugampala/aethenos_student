import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import { remove_wishlist_product } from "../../redux/features/wishlist-slice";
import { IMG_HOST } from "../../api";
import CalculateDiscountedPrice from "../../functions/pricing/CalculateDiscountedPrice";
import getSymbolFromCurrency from "currency-symbol-map";
import GetCurrencyByCountry from "../../functions/pricing/GetCurrencyByCountry";

const mainfs = {
  fontSize: "clamp(0.2rem, 0.8rem + 0.6vw, 1rem)",
};

const SingleWishlist = ({ item }) => {
  const dispatch = useDispatch();
  const { cartCourses } = useSelector((state) => state.cart);
  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(cart_course(course));
  };

  console.log(item);

  return (
    <tr style={{ paddingLeft: "40%" }}>
      <td className="product-remove">
        <a
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(remove_wishlist_product(item))}
          className="remove-wishlist"
        >
          <i className="icon-73"></i>
        </a>
      </td>
      <td className="product-thumbnail pe-5">
        <Link href={`/course-details/${item.id}`} legacyBehavior>
          <img src={`${IMG_HOST}${item.img}`} alt="Books" />
        </Link>
      </td>
      <td className="product-title" style={mainfs}>
        <Link href={`/course-details/${item.id}`} legacyBehavior>
          {item.title}
        </Link>
      </td>
      <td className="product-price" data-title="Price">
        <span className="currency-symbol">
          {getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))}
        </span>
        {CalculateDiscountedPrice(item.other_data)}
      </td>

      <td className="product-add-cart" onClick={() => handleAddToCart(item)}>
        <a style={{ cursor: "pointer" }} className="edu-btn btn-medium">
          {cartCourses.some((course) => course.id === item.id)
            ? "Remove from Cart"
            : "Add to cart"}
        </a>
      </td>
    </tr>
  );
};

export default SingleWishlist;
