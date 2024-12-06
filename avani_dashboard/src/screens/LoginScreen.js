import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../redux/actions/adminAction";
const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminLoginState = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLoginState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };

  useEffect(() => {
    if (adminInfo && adminInfo.success) {
      navigate("/home");
    }
  }, [adminInfo]);
  return (
    <div class="account-pages my-5 pt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card overflow-hidden">
              <div class="bg-primary">
                <div class="text-primary text-center p-4">
                  <h5 class="text-white font-size-20">Welcome Back !</h5>
                  <p class="text-white-50">
                    Sign in to continue to Avani Nepal
                  </p>
                  <a href="index.html" class="logo logo-admin">
                    <img
                      src="assets/images/logo-sm.png"
                      height="24"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>

              <div class="card-body p-4">
                <div class="p-3">
                  <form class="mt-4" onSubmit={handleSubmitForm}>
                    <div class="mb-3">
                      <label class="form-label" for="username">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="username"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="userpassword">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="userpassword"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div class="mb-3 row">
                      <div class="col-sm-6"></div>
                      <div class="col-sm-6 text-end">
                        <button
                          class="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="mt-5 text-center">
              {/* <p>
                Don't have an account ?{" "}
                <a href="pages-register.html" class="fw-medium text-primary">
                  {" "}
                  Signup now{" "}
                </a>{" "}
              </p> */}
              <p class="mb-0">
                © <script>document.write(new Date().getFullYear())</script>{" "}
                Avani Nepal. Crafted by Sanjay RD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
