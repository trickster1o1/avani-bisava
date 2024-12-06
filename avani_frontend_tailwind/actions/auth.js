import axios from "axios";
import fetch from "isomorphic-fetch";
import { API } from "../config";
import { toast } from "react-toastify";
import cookie from "js-cookie";

export const registerUser = async (name, phone, email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${API}/user`,
      {
        name,
        phone,
        email,
        password,
      },
      config
    );

    toast.info("Register Successfully", {
      autoClose: 1000,
    });
    return data;
  } catch (err) {
    toast.error(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message,
      {
        autoClose: 1000,
      }
    );

    return true;

    // console.log(
    //   err.response && err.response.data.message
    //     ? err.response.data.message
    //     : err.message
    // );
    // dispatch({
    //   type: PRODUCT_ADD_FAIL,
    //   payload:
    //     err.response && err.response.data.message
    //       ? err.response.data.message
    //       : err.message,
    // });
  }
};
export const siginin = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${API}/user/login`,
      {
        email,
        password,
      },
      config
    );

    toast.info("Login Successfully", {
      autoClose: 1000,
    });
    return data;
  } catch (err) {
    toast.error(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message,
      {
        autoClose: 1000,
      }
    );
    return true;
  }
};

// set cookies
export const setCookies = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove cookies
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookies
export const getCookie = (key) => {
  if (process.browser) {
    cookie.get(key);
  }
};

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

// authenticate user by passing data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookies("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

// user info from localstorage
// export const isAuth = () => {
//   if (process.browser) {
//     const cookieChecked = getCookie("token");
//     if (cookieChecked) {
//       if (localStorage.getItem("user")) {
//         return JSON.parse(localStorage.getItem("user"));
//       } else {
//         return false;
//       }
//     }
//   }
// };
