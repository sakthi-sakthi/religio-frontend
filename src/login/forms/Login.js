import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import ApiUrl from "../../dashboard/pages/Api/Api";

$(function () {
  $("#toggle_pwd").click(function () {
    $("#toggle_eye").toggleClass("fa-eye-slash");
    var type = $("#toggle_eye").hasClass("fa-eye-slash") ? "text" : "password";
    $("#password").attr("type", type);
  });
});

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("* Email is required")
      .email("* Email is invalid"),
    password: Yup.string()
      .required("* Password is required")
      .min(6, "* Password must be at least 6 characters"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmitLoginform(data, e) {
    axios
      .post(`${ApiUrl}/Login`, data)

      .then((Response) => {
        const Logindata = Response.data;

        if (Logindata.loginVal === "true") {
          sessionStorage.setItem("userDetails", JSON.stringify(Logindata.user));
          Swal.fire({
            title: "Logged in successfully",
            icon: "success",
            confirmButtonColor: "green",
          });
          const userData = Logindata.user;

          if (userData.role === "admin") {
            navigate("/Religio/Dashboard");
          } else {
            navigate("/Religio/Dashboard");
          }
        } else {
          Swal.fire({
            title: "Sign-in Failed",
            text: "please check your username and password!",
            icon: "error",
            button: "try again!",
          });
          navigate("/login");
          e.target.reset();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <Link to="/">
                    <center>
                      <img src="./logo.png" style={{ width: "185px" }} alt="" />
                    </center>
                  </Link>
                </div>
                <form
                  className="pt-3"
                  onSubmit={handleSubmit(onSubmitLoginform)}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-12">
                          <input
                            name="email"
                            type="email"
                            {...register("email")}
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email"
                            autoComplete="off"
                          />
                          <div className="invalid-feedback">
                            {errors.email?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                          Password <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-12">
                          <div className="input-group">
                            <input
                              name="password"
                              type="password"
                              id="password"
                              {...register("password")}
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Password"
                              autoComplete="off"
                            />
                            <div className="input-group-append">
                              <span
                                id="toggle_pwd"
                                className="input-group-text"
                                style={{ cursor: "pointer" }}>
                                <i
                                  id="toggle_eye"
                                  className="fa fa-eye field_icon"></i>
                              </span>
                            </div>
                            <div className="invalid-feedback">
                              {errors.password?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                      SIGN IN
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    <Link
                      to="/forget"
                      className="text-primary"
                      style={{ textDecoration: "none" }}>
                      Forgot Password
                    </Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    <Link
                      to="/"
                      className="text-primary"
                      style={{ textDecoration: "none" }}>
                      <i className="fa fa-home"> Home</i>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
