import { toast } from "react-toastify";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

const cartItemsFromStorage =
  process.browser && localStorage.getItem("cartItems")
    ? process.browser && JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddressFromStorage =
  process.browser && localStorage.getItem("saveShippingAddress")
    ? process.browser && JSON.parse(localStorage.getItem("saveShippingAddress"))
    : null;
const paymentMethodFromStorage =
  process.browser && localStorage.getItem("savePaymentMethod")
    ? process.browser && JSON.parse(localStorage.getItem("savePaymentMethod"))
    : "";

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

export const productAddToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exitItem = state.cartItems.find((x) => x.uuid === item.uuid);

      if (exitItem) {
        toast.success("Product Update To Cart", {
          autoClose: 700,
        });
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.uuid === exitItem.uuid ? item : x
          ),
        };
      } else {
        toast.info("Product Added To Cart", {
          autoClose: 700,
        });
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      toast.info("Product Removed From Cart", {
        autoClose: 700,
      });
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.uuid !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
