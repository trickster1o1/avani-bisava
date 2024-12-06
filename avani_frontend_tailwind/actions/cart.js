import axios from "axios";
import { toast } from "react-toastify";

let cartItemsFromStorage =
  process.browser && localStorage.getItem("cartItems")
    ? process.browser && JSON.parse(localStorage.getItem("cartItems"))
    : [];

// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove localstorge
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// add to cart
export const addToCart = async (id, qty) => {
  const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);
  const product = {
    uuid: data.uuid,
    name: data.name,
    price: data.price,
    discount: data.price_discount,
    image: data.image,
    qty,
  };
  const exitItem = cartItemsFromStorage.find((x) => x.uuid === product.uuid);
  if (exitItem) {
    cartItemsFromStorage = cartItemsFromStorage.map((x) =>
      x.uuid === exitItem.uuid ? product : x
    );
    toast.info("Product Already Added To Cart", {
      autoClose: 1000,
    });
  } else {
    cartItemsFromStorage.push(product);
    toast.info("Product Added To Cart", {
      autoClose: 1000,
    });
  }

  setLocalStorage("cartItems", cartItemsFromStorage);

  // console.log("cartItemsFromStorage", cartItemsFromStorage);
};

// remove items from cart
export const removeCartItem = (uuid) => {
  const cartItemsAfterRemove = cartItemsFromStorage.filter(
    (x) => x.uuid !== uuid
  );
  toast.error("Product Remove from Cart", {
    autoClose: 1000,
  });
  // console.log("cartItemsAfterRemove", cartItemsAfterRemove);
  setLocalStorage("cartItems", cartItemsAfterRemove);
  // localStorage.setItem("cartItems", JSON.stringify(cartItemsAfterRemove));
};

export const getCartItemsFromLocalStorage = () => {
  if (process.browser) {
    if (localStorage.getItem("cartItems")) {
      return JSON.parse(localStorage.getItem("cartItems"));
    } else {
      return false;
    }
  }
};
