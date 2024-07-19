import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AddNewClient = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState();
  const [formDetails, setFormDetails] = useState({
    name: "",
    phone: "",
    alternate_name: "",
    alternate_phone: "",
    address: "",
    identity: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name == "phone" || e.target.name == "alternate_phone") {
      e.target.value = e.target.value.replace(/[^0-9+]/g, "");
    }

    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.files[0] });
  };

  const validateForm = () => {
    setErrors(null);
    var err = null;
    if (
      formDetails.name == "" ||
      formDetails.phone == "" ||
      formDetails.alternate_name == "" ||
      formDetails.alternate_phone == "" ||
      formDetails.address == "" ||
      formDetails.identity == ""
    ) {
      err = {
        form: "Please Fill All the fields",
      };
    }
    if (formDetails.name == "") {
      err = { ...err, name: "Please Fill this field" };
    } else if (formDetails.name.length < 3 || formDetails.name.length > 20) {
      err = { ...err, name: "Name must be between 3-20 characters" };
    }
    if (formDetails.phone == "") {
      err = { ...err, phone: "Please Fill this field" };
    } else if (formDetails.phone.length != 10) {
      err = { ...err, phone: "Phone Number be of 10 Digits" };
    }
    if (formDetails.alternate_name == "") {
      err = { ...err, alternate_name: "Please Fill this field" };
    } else if (
      formDetails.alternate_name.length < 3 ||
      formDetails.alternate_name.length > 20
    ) {
      err = {
        ...err,
        alternate_name: "Alternate Name must be between 3-20 characters",
      };
    }
    if (formDetails.alternate_phone == "") {
      err = { ...err, alternate_phone: "Please Fill this field" };
    } else if (formDetails.alternate_phone.length != 10) {
      err = {
        ...err,
        alternate_phone: "Alternate Phone Number be of 10 Digits",
      };
    }
    if (formDetails.address == "") {
      err = { ...err, address: "Please Fill this field" };
    } else if (formDetails.address.length < 7) {
      err = { ...err, address: "Address must be more than 7 characters" };
    }
    if (formDetails.identity == "") {
      err = {
        ...err,
        identity: "Please Upload an Identification Proof",
      };
    }
    setErrors(err);
    return err;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm() != null) {
      return;
    }
    setIsButtonLoading(true);
    axiosInstance
      .post(`${import.meta.env.VITE_SERVER_URL}/owner`, formDetails, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success("New Client Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Error Adding New Client", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  return (
    <>
      <div className="card mx-auto bg-base-300 shadow-xl min-w-96 max-w-xl w-4/6">
        <div className="card-body pt-4 w-full">
          <h2 className={`mx-auto m-4 font-bold text-lg `}>Add New Client</h2>
          {errors && <p className="text-center text-red-500"> {errors.form}</p>}
          <form onSubmit={handleFormSubmit} className="mx-auto max-w-lg w-full">
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Name</span>
                {errors && errors.name && (
                  <span className="label-text-alt text-red-500">
                    {errors.name}
                  </span>
                )}
              </div>
              <input
                onChange={handleInputChange}
                name="name"
                type="text"
                className={`input input-bordered w-full max-w-lg ${
                  errors && errors.name ? `input-error` : ``
                }`}
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Phone</span>
                {errors && errors.phone && (
                  <span className="label-text-alt text-red-500">
                    {errors.phone}
                  </span>
                )}
              </div>
              <input
                onChange={handleInputChange}
                name="phone"
                type="tel"
                className={`input input-bordered w-full max-w-lg ${
                  errors && errors.phone ? `input-error` : ``
                }`}
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Alternate Contact Name</span>
                {errors && errors.alternate_name && (
                  <span className="label-text-alt text-red-500">
                    {errors.alternate_name}
                  </span>
                )}
              </div>
              <input
                onChange={handleInputChange}
                name="alternate_name"
                type="text"
                className={`input input-bordered w-full max-w-lg ${
                  errors && errors.alternate_name ? `input-error` : ``
                }`}
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Alternate Contact Phone</span>
                {errors && errors.alternate_phone && (
                  <span className="label-text-alt text-red-500">
                    {errors.alternate_phone}
                  </span>
                )}
              </div>
              <input
                onChange={handleInputChange}
                name="alternate_phone"
                type="tel"
                className={`input input-bordered w-full max-w-lg ${
                  errors && errors.alternate_phone ? `input-error` : ``
                }`}
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Address</span>
                {errors && errors.address && (
                  <span className="label-text-alt text-red-500">
                    {errors.address}
                  </span>
                )}
              </div>
              <input
                onChange={handleInputChange}
                name="address"
                type="text"
                className={`input input-bordered w-full max-w-lg ${
                  errors && errors.address ? `input-error` : ``
                }`}
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Identity Proof</span>
                {errors && errors.identity && (
                  <span className="label-text-alt text-red-500">
                    {errors.identity}
                  </span>
                )}
              </div>
              <input
                name="identity"
                type="file"
                className={`file-input file-input-bordered w-full max-w-lg${
                  errors && errors.identity ? `file-input-error` : ``
                }`}
                onChange={handleFileUpload}
                accept="image/*,.pdf"
              />
            </label>
            <button
              disabled={isButtonLoading ? true : false}
              className="btn btn-primary mt-6 form-control w-full "
              type="submit"
            >
              {isButtonLoading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewClient;
