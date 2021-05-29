import Axios from "axios";
import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_LIST, CART_UPDATE
} from "../constants/cartConstants";


const myCartList = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: {userInfo},
    } = getState();

    const { data } = await Axios.get("http://localhost:8000/api/my-cart",
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.meta.token,
          },
        });
    dispatch({
      type: CART_LIST, payload: data
    });

  } catch (error) {

  }
}

const placeOrder = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: {userInfo},
    } = getState();

    const { data } = await Axios.get("http://localhost:8000/api/checkout",
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.meta.token,
          },
        });
    dispatch({
      type: CART_LIST, payload: data
    });

  } catch (error) {

  }
}

const addToCart = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {userInfo},
    } = getState();

    let cartData = {
      product_id : productId,
    }
    const { data } = await Axios.post("http://localhost:8000/api/order", cartData,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.meta.token,
          },
        });

    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data.data.id,
        name: data.data.product_name,
        image: data.data.image,
        price: data.data.price,
        qty: data.data.quantity
      }
    });

  } catch (error) {

  }
}

const updateMyCart = (id,qty) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {userInfo},
    } = getState();

    let cartData = {
      id : id,
      quantity : qty,
    }
    const { data } = await Axios.post("http://localhost:8000/api/update-cart", cartData,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.meta.token,
          },
        });

    dispatch({
      type: CART_UPDATE, payload: {
        product: data.data.id,
        name: data.data.product_name,
        image: data.data.image,
        price: data.data.price,
        qty: data.data.quantity
      }
    });

  } catch (error) {

  }
}
const removeFromCart = (id) => async (dispatch, getState) => {

  try {
    const {
      userSignin: {userInfo},
    } = getState();

    const { data } = await Axios.delete("http://localhost:8000/api/remove-cart/"+ id,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.meta.token,
          },
        });

    dispatch({ type: CART_REMOVE_ITEM, payload: data });

  } catch (error) {

  }



  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
export { addToCart, removeFromCart, saveShipping, savePayment, myCartList, placeOrder, updateMyCart }