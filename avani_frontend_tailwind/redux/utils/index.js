import cookie from "js-cookie";

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
    return cookie.get(key);
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
  setLocalStorage("avani_user", data.user);
  next();
};

// user info from localstorage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");

    if (cookieChecked) {
      if (localStorage.getItem("avani_user")) {
        return JSON.parse(localStorage.getItem("avani_user"));
      } else {
        return false;
      }
    }
  }
};
