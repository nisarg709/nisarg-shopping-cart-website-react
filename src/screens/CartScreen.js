import React, {useEffect} from "react";
import {
    addToCart,
    myCartList,
    placeOrder,
    removeFromCart, updateMyCart
} from "../actions/cartActions";
import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";

function CartScreen(props) {
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cart);
    const cartUpdate = useSelector(state => state.cartUpdate);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = cartUpdate;
    let cartItems =
        cartList && cartList.cart && cartList.cart.data ? cartList.cart.data : [];
    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    };
    useEffect(() => {
        dispatch(myCartList());
    }, [cartUpdate]);

    const checkoutHandler = () => {
        dispatch(placeOrder());
        props.history.push("/shipping");
    };

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? (
                        <div>Cart is empty</div>
                    ) : (
                        cartItems.map(item => (
                            <li>
                                <div className="cart-image">
                                    <img src={item.productDetail.image} alt="product"/>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.productDetail.id}>
                                            {item.productDetail.product_name}
                                        </Link>
                                    </div>
                                    <div className="cart-qty">
                                        Qty:
                                        <select value={item.quantity}
                                                onChange={(e) => dispatch(updateMyCart(item.id, e.target.value))}>
                                            {[...Array(10).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select>
                                        <button1
                                            type="button"
                                            className="button cartBtn"
                                            onClick={() => removeFromCartHandler(item.id)}
                                        >
                                            Delete
                                        </button1>
                                    </div>
                                </div>
                                <div className="cart-price">${item.productDetail.price}</div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} items) : ${" "}
                    {cartItems.reduce(
                        (a, c) => a + c.productDetail.price * c.quantity,
                        0
                    )}
                </h3>
                <button
                    onClick={checkoutHandler}
                    className="button primary full-width"
                    disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;
