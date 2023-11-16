import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function DomainrenewalView() {
  const { id } = useParams();
  $(".domaindisable").prop("disabled", true);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ApiUrl}/Religio/Domainrenewal/edit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-domain menu-icon" />
          </span>{" "}
          Domain Renewel View
        </h3>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form className="form-sample" encType="multipart/form-data">
                <br></br>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Site Name &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control domaindisable"
                      name="sitename"
                      placeholder="Site Name"
                      {...register("sitename", {
                        required: true,
                      })}
                      aria-invalid={errors?.sitename ? "true" : "false"}
                    />
                    {errors?.sitename?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Site Name is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Site URL &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control domaindisable"
                      name="siteurl"
                      placeholder="Site URL"
                      {...register("siteurl", {
                        required: true,
                      })}
                      aria-invalid={errors?.siteurl ? "true" : "false"}
                    />
                    {errors?.siteurl?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">Site URL is required</label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Server Details &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control domaindisable"
                      name="serverdetail"
                      placeholder="Server Detail"
                      {...register("serverdetail", {
                        required: true,
                      })}
                      aria-invalid={errors?.serverdetail ? "true" : "false"}
                    />
                    {errors?.serverdetail?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Server Detail is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Server Name &nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control domaindisable"
                      name="servername"
                      placeholder="Server Name "
                      {...register("servername", {
                        required: true,
                      })}
                      aria-invalid={errors?.servername ? "true" : "false"}
                    />
                    {errors?.servername?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Server Name is required
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>
                      Domain Create Date &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="Date"
                      className="form-control domaindisable"
                      name="domain_create_date"
                      {...register("domain_create_date", { required: true })}
                      aria-invalid={
                        errors?.domain_create_date ? "true" : "false"
                      }
                    />
                    {errors?.domain_create_date?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Domain Create Date is required
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      Domain Expire Date &nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="Date"
                      className="form-control domaindisable"
                      name="domain_expire_date"
                      {...register("domain_expire_date", { required: true })}
                      aria-invalid={
                        errors?.domain_expire_date ? "true" : "false"
                      }
                    />
                    {errors?.domain_expire_date?.type === "required" && (
                      <div className="text-danger text_error">
                        <label className="errlabel">
                          Domain Expire Date is required
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  {/* <button
                    className="btn btn-gradient-primary font-weight-bold"
                    type="submit">
                    Save
                  </button> */}
                  &nbsp; &nbsp; &nbsp;
                  <Link
                    to="/Religio/DomainRenewal"
                    className="btn btn-gradient-primary font-weight-bold ">
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
export default DomainrenewalView;
