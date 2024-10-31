import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cart_course, decrease_quantity, remove_cart_course } from '../../redux/features/cart-slice';
import { IMG_HOST } from '../../api';
import CalculateDiscountedPrice from '../../functions/pricing/CalculateDiscountedPrice'
import getSymbolFromCurrency from 'currency-symbol-map'
import GetCurrencyByCountry from '../../functions/pricing/GetCurrencyByCountry';
import FormatNumbers from '../../functions/FormatNumbers';

const mainfs = {
    fontSize: "clamp(0.2rem, 0.8rem + 0.6vw, 1rem)",  
  };
  

const CartItem = ({ item }) => {

    const dispatch = useDispatch();
    const handleChange = (e) => {}
    return (
        <tr style={{paddingLeft: "40%"}}>
            <td className="product-remove" onClick={() => dispatch(remove_cart_course(item))}>
                <a style={{ cursor: 'pointer' }} className="remove-wishlist"><i className="icon-73"></i></a>
            </td>

            <td className="product-thumbnail pe-5">
                <Link href={`/course-details/${item.course_code}`} legacyBehavior>
                    <img src={`${IMG_HOST}${item.img}`} alt="Books" />
                </Link>
            </td>

            <td className="product-title" style={mainfs}>
                <Link href={`/course-details/${item.other_data.course_code}`} legacyBehavior>
                    {item.title}
                </Link>
            </td>

            <td className="product-price" data-title="Price">
                <span className="currency-symbol">{getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))}</span>{FormatNumbers(CalculateDiscountedPrice(item.other_data))}
            </td>

            {/* <td className="product-quantity" data-title="Qty">
                <div className="pro-qty">
                    <span className="dec qtybtn" onClick={() => dispatch(decrease_quantity(item))}>-</span>
                    <input type="text" onChange={handleChange} value={item.quantity} />
                    <span className="inc qtybtn" onClick={() => dispatch(cart_course(item))}>+</span>
                </div>
            </td> */}
            
            <td className="product-subtotal" data-title="Subtotal">
                <span className="currency-symbol">{getSymbolFromCurrency(GetCurrencyByCountry(item.other_data))}</span>{FormatNumbers((1 * (CalculateDiscountedPrice(item.other_data))).toFixed(2))}
            </td>
        </tr>
    );
}

export default CartItem;