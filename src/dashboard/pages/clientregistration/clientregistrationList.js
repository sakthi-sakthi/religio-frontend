import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ApiUrl from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import React from "react";

function ClientregistrationList() {
  const exportTable = () => {
    axios
      .get(`${ApiUrl}/Religio/Clientregistration/export`)
      .then((response) => {
        // Trigger file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "client_registration.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Export error:", error);
      });
  };
  
  useEffect(() => {
    const fetchData = () => {
      fetch(`${ApiUrl}/Religio/Clientregistration`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          SetClientregister(resp.data);
          FilterClientregister(resp.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  const isLogedIn = JSON.parse(sessionStorage.getItem("userDetails"));
  const [register, SetClientregister] = useState([]);
  const [FilterRegister, FilterClientregister] = useState([]);
  const navigate = useNavigate();

  const EditClientregistration = async (e, id) => {
    navigate("/Religio/Clientregistration/Edit/" + id);
  };

  const deleteregister = async (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${ApiUrl}/Religio/Clientregistration/${id}`)
          .then((res) => {
            // fetchData();
          });
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  };
  const peojectstatsadd = async (e, id) => {
    navigate("/Religio/Tab/" + id);
  };
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Congregation",
      cell: (row) => (
        <>
          <a
           href={() => false}
            onClick={(e) => peojectstatsadd(e, row.id)}
            className="my-component">
            {row.congregation}
          </a>
        </>
      ),
      sortable: true,
    },
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Place",
      selector: (row) => row.place,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <a
           href={() => false}
            onClick={(e) => peojectstatsadd(e, row.id)}
            style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
            className="mdi mdi-eye"
            id="print"> </a>
          {isLogedIn?.role === "admin" && (
            <>
              <a
               href={() => false}
                onClick={(e) => EditClientregistration(e, row.id)}
                style={{ cursor: "pointer", paddingRight: 4, color: "black" }}
                className="mdi mdi-pencil-box"
                id="print"> </a>
              <a
                href={() => false}
                onClick={(e) => deleteregister(e, row.id)}
                style={{ cursor: "pointer", color: "black" }}
                className="mdi mdi-delete"
                id="print"> </a>
            </>
          )}
        </>
      ),

      width: "100px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
        backgroundColor: "#fafafa",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
    pagination: {
      style: {
        fontWeight: "700",
        color: "black",
      },
    },
  };

  function filterdata(event) {
    var value = event.target.value;
    const keys = ["congregation", "province", "name", "place"];

    const filter = FilterRegister?.filter((item) =>
      keys.some((key) =>
        item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );

    SetClientregister(filter);
  }

  const [pending, setPending] = React.useState(true);
  // const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // setRows(register);
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
  });
  return (
    <div className="content-wrapper">
      <div className="page-header">
        <h3 className="page-title">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-account-plus menu-icon" />
          </span>{" "}
          Client Registration
        </h3>
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <input
                    id="myInput"
                    type="text"
                    onChange={filterdata}
                    className="form-control myInput"
                    placeholder="Search.."
                  />
                </div>
                <div className="col-lg-6"></div>
                <div className="col-lg-2">
                  {isLogedIn?.role === "admin" ? (
                    <Link to="/Religio/Clientregistration/Add">
                      <i
                        class="fa-solid fa-user-plus"
                        style={{ color: "black" }}></i>
                    </Link>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <label onClick={exportTable}>
                    <i
                      class="fa-solid fa-file-csv"
                      style={{ color: "black", cursor: "pointer" }}></i>
                  </label>
                </div>
              </div>
              <br></br>
              <DataTable
                columns={columns}
                theme="solarized"
                data={register}
                pagination
                progressPending={pending}
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientregistrationList;
