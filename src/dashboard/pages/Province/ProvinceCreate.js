import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";

function ProvinceCreate() {
  const country = require("country-state-city").Country;
  const value = country.getAllCountries();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Province/Congregation`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        Congregation(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [congre, Congregation] = useState([]);

  function onSubmitCongregationform(data, e) {
    axios
      .post(`${ApiUrl}/Religio/Province/store`, data)
      .then((Response) => {
        if (Response.status === 200) {
          Swal.fire("Province Created Successfully..!", "", "success");
          e.target.reset();
          navigate("/Religio/Province");
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

  function countrySelect(event) {
    var value = event.target.value;
    const State = require("country-state-city").State;
    var getValue = State.getStatesOfCountry(value);
    datas(getValue);
  }

  function checkedvalue(data, evt) {
    var id = $("#congregation").val();

    if ($(".addresscheck").is(":checked")) {
      if (id === "") {
        alert("Please Choose one congregation");
      } else {
        axios
          .get(`${ApiUrl}/Religio/CongrationAddress/get/${id}`)
          .then((response) => {
            const resdata = response.data;
            reset(resdata.data[0]);
            const value = resdata.data[0].country;
            const State = require("country-state-city").State;
            var getValue = State.getStatesOfCountry(value);
            datas(getValue);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      reset({
        country: "",
        state: "",
        city: "",
        address2: "",
        address1: "",
        mobile: "",
        email: "",
        postcode: "",
      });
    }
  }
  const [selectState, datas] = useState([]);

  function congregationChange() {
    $(".addresscheck").prop("checked", true);
    checkedvalue();
  }
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Province
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form
                className="form-sample"
                onSubmit={handleSubmit(onSubmitCongregationform)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Congregation&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="form-control"
                          name="congregation"
                          id="congregation"
                          {...register("congregation", {
                            required: true,
                            onChange: congregationChange,
                          })}
                          aria-invalid={
                            errors?.congregation ? "true" : "false"
                          }>
                          <option value="">Select Congregation</option>
                          {congre &&
                            congre.map((item) => (
                              <option value={item.id}>
                                {item.congregation}
                              </option>
                            ))}
                        </select>
                        {errors?.Congregation?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select Congregation
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Province&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="province"
                          {...register("province", { required: true })}
                          aria-invalid={errors?.province ? "true" : "false"}
                        />
                        {errors?.province?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Province Name is required
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <b className="card-description"> Address </b>
                    <div className="form-check form-check-flat form-check-primary">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input addresscheck"
                          name="adderssCopy"
                          onChange={checkedvalue}
                        />{" "}
                        Use Congregation Address <i class="input-helper"></i>
                      </label>
                    </div>
                    <div className="col-md-6"> </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Address1&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control prodata"
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
                          className="form-control prodata"
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
                          className="form-control prodata"
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
                          className="form-control Countryvalue prodata"
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
                          className="form-control Countryindia prodata"
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
                          className="form-control prodata"
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
                          className="form-control prodata"
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
                          className="form-control prodata"
                          name="mobile"
                          {...register("mobile", {
                            required: true,
                            minLength: 10,
                            maxLength: 12,
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
                <div className="row">
                  <b className="card-description"> Contact Person </b>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Name&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control prodata"
                          name="contactname"
                          {...register("contactname", {
                            required: true,
                          })}
                          aria-invalid={errors?.contactname ? "true" : "false"}
                        />
                        {errors?.contactname?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">Name is required</label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Role&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control Countryindia prodata"
                          name="contactrole"
                          {...register("contactrole", { required: true })}
                          aria-invalid={
                            errors?.contactrole ? "true" : "false"
                          }></input>
                        {errors?.contactrole?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select Role
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
                          className="form-control prodata"
                          name="contactemail"
                          {...register("contactemail", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          aria-invalid={errors?.contactemail ? "true" : "false"}
                        />
                        {errors?.contactemail?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Email is required
                            </label>
                          </div>
                        )}
                        {errors?.contactemail?.type === "pattern" && (
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
                          className="form-control prodata"
                          name="contactmobile"
                          {...register("contactmobile", {
                            required: true,
                            minLength: 10,
                            maxLength: 12,
                          })}
                          aria-invalid={
                            errors?.contactmobile ? "true" : "false"
                          }
                        />
                        {errors?.contactmobile?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Mobile Number is required
                            </label>
                          </div>
                        )}
                        {errors?.contactmobile?.type === "minLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be minimum Numbers 10
                            </label>
                          </div>
                        )}
                        {errors?.contactmobile?.type === "maxLength" && (
                          <div className="text-danger text_error ">
                            <label className="errlabel">
                              Mobile Number shoul be maximum Numbers12
                            </label>
                          </div>
                        )}
                        {errors?.contactmobile?.type === "pattern" && (
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Status&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control Countryindia prodata"
                          name="contactstatus"
                          {...register("contactstatus", { required: true })}
                          aria-invalid={
                            errors?.contactstatus ? "true" : "false"
                          }>
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                        </select>
                        {errors?.contactstatus?.type === "required" && (
                          <div className="text-danger text_error">
                            <label className="errlabel">
                              Please Select Status
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    class="btn btn-gradient-primary font-weight-bold "
                    type="submit">
                    Submit
                  </button>
                  &nbsp; &nbsp; &nbsp;
                  <Link
                    to="/Religio/Province"
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
export default ProvinceCreate;
