import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function CongregationView() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const country = require("country-state-city").Country;
  const value = country.getAllCountries();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Congregationedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
        const value = resp.data[0].country;
        const State = require("country-state-city").State;
        var getValue = State.getStatesOfCountry(value);
        data(getValue);
        $(".updatebut").hide();
        $(".congdata").prop("disabled", true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function countrySelect(event) {
    var value = event.target.value;
    const State = require("country-state-city").State;
    var getValue = State.getStatesOfCountry(value);
    data(getValue);
  }
  const [selectState, data] = useState([]);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Congregation View
        </h3>
        {/* <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
            </li>
          </ul>
        </nav> */}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <div className="row"><b className="card-description"> Congregation </b></div> */}
              <form className="form-sample" onSubmit={handleSubmit()}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label className="col-form-label">
                        Congregation Name&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="congregation"
                          {...register("congregation", { required: true })}
                          aria-invalid={errors?.congregation ? "true" : "false"}
                        />
                        {errors?.congregation?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Congregation Name is required
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <b className="card-description"> Address </b>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address1&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="address1"
                          {...register("address1", { required: true })}
                          aria-invalid={errors?.address1 ? "true" : "false"}
                        />
                        {errors?.address1?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Address 1 is required
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address 2
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="address2"
                          {...register("address2")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        City&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="city"
                          {...register("city", { required: true })}
                          aria-invalid={errors?.city ? "true" : "false"}
                        />
                        {errors?.city?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">City is required</label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Country&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryvalue congdata"
                          name="country"
                          {...register("country", {
                            required: true,
                            onChange: countrySelect,
                          })}
                          aria-invalid={errors?.country ? "true" : "false"}>
                          <option value="">Select Country</option>
                          {value &&
                            value.map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        {errors?.country?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select Country
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        State&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryindia congdata"
                          name="state"
                          {...register("state", { required: true })}
                          aria-invalid={errors?.state ? "true" : "false"}>
                          <option value="">Select State</option>
                          {selectState &&
                            selectState.map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        {errors?.state?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select State
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Pin code&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="postcode"
                          {...register("postcode", {
                            required: true,
                            pattern: { value: /^[0-9\b]+$/ },
                          })}
                          aria-invalid={errors?.postcode ? "true" : "false"}
                        />
                        {errors?.postcode?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Postcode is required
                            </label>
                          </div>
                        )}
                        {errors?.postcode?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Postcode can contain only Numbers
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Email&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          aria-invalid={errors?.email ? "true" : "false"}
                        />
                        {errors?.email?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Email is required
                            </label>
                          </div>
                        )}
                        {errors?.email?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Invalid email address
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Mobile No&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control congdata"
                          name="mobile"
                          {...register("mobile", {
                            required: true,
                            minLength: 10,
                            maxLength: 12,
                            pattern: /^[]?\d*(?:[.,]\d*)?$/,
                          })}
                          aria-invalid={errors?.mobile ? "true" : "false"}
                        />
                        {errors?.mobile?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Mobile Number is required
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "minLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be minimum Numbers 10
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "maxLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be maximum Numbers12
                            </label>
                          </div>
                        )}
                        {errors?.mobile?.type === "pattern" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number can contain only Numbers
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  {/* <button class="btn btn-gradient-primary font-weight-bold updatebut" type="submit">Update</button> */}

                  <Link
                    to="/Religio/Congregation"
                    class="btn btn-gradient-primary font-weight-bold ">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CongregationView;
