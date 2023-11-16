import { useForm } from "react-hook-form";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ApiUrl from "../Api/Api";
import { Link, useNavigate, useParams } from "react-router-dom";

function DatasupportEdit() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onChange' });  

  const {id} = useParams();
  useEffect(() => {
    fetch(`${ApiUrl}/Datasupportedit/${id}`).then((res) => {
        return res.json();
    }).then((resp) => {
       reset(resp.data[0]);
    }).catch((err) => {
        console.log(err.message);
    })
  }, [])



const navigate = useNavigate();

const handleNavigation=()=>{
  navigate({
    pathname:"/Religio/Tab",
    search:"?active=7"
  })
}

  function onSubmitdatasupport(data,e){
   console.log(data);
    axios.put(`${ApiUrl}/Datasupportupdate/${id}`,data)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire(
            'Updated Successfully..!',
            'Data Support Updated ..',
            'success'
          );
          // navigate('/Religio/Memberdata');
          handleNavigation()
          e.target.reset();  
      }
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: err.message
      })
    })
    
  }

  return (    
    <div className="content-wrapper">
        <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span> Basic Data Status
        </h3>
      </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">

                <form className="form-sample" onSubmit={handleSubmit(onSubmitdatasupport) } >                                

                <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="noofcommunity">No Of Communities&nbsp;<span style={{ color: 'red' }}>*</span></label>

                  <input type="text" className="form-control" name="noofcommunity" placeholder="No Of Communities"
                    {...register("noofcommunity", { required: true, pattern: {value: /^[0-9\b]+$/, }})}
                    aria-invalid={errors?.noofcommunity ? "true" : "false"} />
                  {errors?.noofcommunity?.type === 'required' && <div className='text-danger text_error'>No Of Communities is required</div>}
                  {errors?.noofcommunity?.type === "pattern" && <div className='text-danger text_error '>Numbers only allowed</div>}
                </div>
                <div className="form-group col-md-6">
                  <label for="noofinstitution">No Of Institution&nbsp;<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" className="form-control" name="noofinstitution" placeholder="No Of Institution"
                    {...register("noofinstitution", { required: true,pattern: { value: /^[0-9\b]+$/, } })}
                    aria-invalid={errors?.noofinstitution ? "true" : "false"} />
                  {errors?.noofinstitution?.type === 'required' && <div className='text-danger text_error'>No Of Institution is required</div>}
                  {errors?.noofinstitution?.type === "pattern" && <div className='text-danger text_error '>Numbers only allowed</div>}
                </div>
              </div>

              <div class="form-row">
                <div className="form-group col-md-6">
                  <label for="noofmembers">No Of Members&nbsp;<span style={{ color: 'red' }}>*</span></label>

                  <input type="text" className="form-control" name="noofmembers" placeholder="No Of Members"
                    {...register("noofmembers", { required: true, pattern: { value: /^[0-9\b]+$/, }})}
                    aria-invalid={errors?.noofmembers ? "true" : "false"} />
                  {errors?.noofmembers?.type === 'required' && <div className='text-danger text_error'>No Of Members is required</div>}
                  {errors?.noofmembers?.type === "pattern" && <div className='text-danger text_error '>Numbers only allowed</div>}
                </div>
                <div className="form-group col-md-6">
                  <label for="exampleInputPassword">No Of Records&nbsp;<span style={{ color: 'red' }}>*</span></label>
                  <input type="text" className="form-control" name="dataentry" placeholder="No Of Records"
                    {...register("dataentry", { required: true,pattern: { value: /^[0-9\b]+$/,} })}
                    aria-invalid={errors?.dataentry ? "true" : "false"} />
                  {errors?.dataentry?.type === 'required' && <div className='text-danger text_error'>No Of Records is required</div>}
                  {errors?.dataentry?.type === "pattern" && <div className='text-danger text_error '>Numbers only allowed</div>}
                </div>
              </div>

                  <div className="text-center">
                    <button type="submit" class="btn btn-gradient-primary me-2">Submit</button>
                    &nbsp; &nbsp; &nbsp; 
                   {/* <Link to="/Religio/Memberdata" class="btn btn-gradient-primary font-weight-bold ">Cancel</Link>
                   </div> */}
                   <div onClick={()=>handleNavigation()} class="btn btn-gradient-primary font-weight-bold ">Cancel</div>
                   </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
    
         );
    }

  export default DatasupportEdit;