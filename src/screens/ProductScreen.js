import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {detailsProduct, saveProductReview} from '../actions/productActions';
import {addToCart} from "../actions/cartActions";

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error} = productDetails;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const {success: productSaveSuccess} = productReviewSave;
    const dispatch = useDispatch();

    let product = productDetails && productDetails.product && productDetails.product.data ? productDetails.product.data : {};

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, []);
    const handleAddToCart = (productId) => {
        dispatch(addToCart(productId));
        props.history.push('/cart');
    };

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error} </div>
            ) : (
                product && (
                    <>
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="product"></img>
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.product_name}</h4>
                                    </li>
                                    <li>
                                        Price: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        Description:
                                        <div>{product.description}</div>
                                    </li>
                                    <ul>
                                        <li>Price: {product.price}</li>
                                        <li>
                                            <button
                                                onClick={() => handleAddToCart(product.id)}
                                                className="button primary"
                                            >
                                                Add to Cart
                                            </button>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
}

export default ProductScreen;
