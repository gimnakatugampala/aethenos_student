import Link from 'next/link';
import React from 'react';
import useCartInfo from '../../hooks/use-cart-info';

const OrderSummery = () => {
  	const { total , quantity } = useCartInfo();

	console.log(total)
	console.log(quantity)
  	return (
        <div className="order-summery">
			<h4 className="title">Cart Totals</h4>
			<table className="table summery-table">
				<tbody>
					<tr className="order-subtotal">
						<td>Subtotal</td>
						<td>${(total).toFixed(2)}</td>
					</tr>
					<tr className="order-total">
						<td>Order Total</td>
						<td>${(total).toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
			<a href="/checkout" className="edu-btn btn-medium checkout-btn">
                Process to Checkout<i className="icon-4"></i>
            </a>
		</div>
    );
}

export default OrderSummery;