import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
} from '../constants/productConstants';
import axios from 'axios';
import Axios from 'axios';

const listProducts = ( search = null
) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {
            userSignin: {userInfo}
        } = getState();

        const {data} = await axios.get("http://localhost:8000/api/products", {
            params: {
              search
            },
            headers: {
                Authorization: "Bearer " + userInfo.meta.token
            }
        });
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
};

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const {
            userSignin: {userInfo},
        } = getState();
        if (!product._id) {
            const {data} = await Axios.post('http://localhost:8000/api/product', product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.meta.token,
                },
            });
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        } else {
            const {data} = await Axios.put(
                'http://localhost:8000/api/product' + product._id,
                product,
                {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.meta.token
                    },
                }
            );
            dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
        }
    } catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
    }
};

const detailsProduct = (productId) => async (dispatch, getState)  => {
    try {
        const {
            userSignin: {userInfo}
        } = getState();

        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get('http://localhost:8000/api/product-detail/' + productId,
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.meta.token,
                },
            }
        );
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
        const {
            userSignin: {userInfo},
        } = getState();
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete('http://localhost:8000/api/product/' + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.meta.token,
            },
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true});
    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
    }
};

export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProdcut,
};
