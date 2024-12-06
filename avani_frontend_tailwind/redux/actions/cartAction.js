import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../config";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";
import { setLocalStorage } from "../utils";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API}/product/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      uuid: data.uuid,
      name: data.name,
      price: data.price,
      discount: data.price_discount,
      image: data.image,
      qty,
    },
  });

  setLocalStorage("cartItems", getState().productAddToCart.cartItems);
};

export const removeToCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  setLocalStorage("cartItems", getState().productAddToCart.cartItems);
};

export const saveShippingAddress = (shipping) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shipping,
  });

  setLocalStorage("saveShippingAddress", shipping);
};

export const savePaymentMethod = (payment) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: payment,
  });

  setLocalStorage("savePaymentMethod", payment);
};
