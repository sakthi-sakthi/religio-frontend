import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import {useParams } from "react-router-dom";

function Memberdatacreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [isEditable, setIsEditable] = useState(false);
  const toggleEditability = () => {
    isEditable && handleSubmit(onSubmitmemberdatacreate);
    setIsEditable(!isEditable);
  };

  const { id } = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/memberdataedit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        reset(resp.data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // const navigate = useNavigate();

  // const handleNavigation =()=>{
  //   navigate({
  //     pathname:"/Religio/Tab",
  //     search:"?active=3"
  //   })
  // }
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  function onSubmitmemberdatacreate(data, e) {
    if (isEditable) return;
    console.log(data);
    axios
      .put(`${ApiUrl}/memberdataupdate/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            "Updated Successfully..!",
            "Member Data Updated ..",
            "success"
          );
          // navigate('/Religio/Memberdata');
          // e.target.reset();
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
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <form
            className="form-sample"
            onSubmit={handleSubmit(onSubmitmemberdatacreate)}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>
                  Status&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-control"
                  name="memberstatus"
                  {...register("memberstatus", { required: true })}
                  aria-invalid={errors?.memberstatus ? "true" : "false"}
                  disabled={!isEditable}
                >
                  <option value="">Select Project Status</option>
                  <option value="Completed">Completed</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Notstrated">Not Started</option>
                </select>

                {errors?.memberstatus?.type === "required" && (
                  <div className="text-danger text_error">
                    Please Choose Member Data satatus
                  </div>
                )}
              </div>
              <div className=" form-group col-md-6">
                <label>
                  Target Date&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="YYYY"
                  name="memberdate"
                  {...register("memberdate", { required: true })}
                  aria-invalid={errors?.memberdate ? "true" : "false"}
                  disabled={!isEditable}
                />
                {errors?.memberdate?.type === "required" && (
                  <div className="text-danger text_error">
                    <label className="errlabel">Target Date is required</label>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              {isLogedIn?.role === "admin" ? (
                <button
                  type="submit"
                  class="btn btn-gradient-light"
                  onClick={toggleEditability}
                  value="Submit"
                >
                  {isEditable ? "Save" : "Edit"}
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Memberdatacreate;
