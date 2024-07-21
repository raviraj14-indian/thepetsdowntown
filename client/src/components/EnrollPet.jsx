import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { subDays } from "react-datepicker/dist/date_utils.d.ts";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const EnrollPet = ({ petId, ownerId, petName, vaccination_expired }) => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState();
  const [formDetails, setFormDetails] = useState({
    diet: "",
    previous_boarding: "",
    existing_injury: "",
    vaccination: "",
    expiry: "",
    vaccination_expired: vaccination_expired,
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [expiry, setExpiry] = useState();

  const handleInputChange = (e) => {
    if (e.target.dataset.type == "bool") {
      {
        e.target.value == "true"
          ? setFormDetails({ ...formDetails, [e.target.name]: true })
          : setFormDetails({ ...formDetails, [e.target.name]: false });
      }
    } else {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    }
  };

  const handleFileUpload = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.files[0] });
  };

  const CustomDateInput = forwardRef(({ value, onChange, onClick }, ref) => (
    <button
      className="btn btn-outline join-item w-full btn-primary"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
      type="button"
    >
      {value}
    </button>
  ));

  const validateForm = () => {
    setErrors(null);
    var err = null;
    if (
      !("anti_tick" in formDetails) ||
      !("deworming_status" in formDetails) ||
      // formDetails.anti_tick == "" ||
      // formDetails.deworming_status == "" ||
      formDetails.diet == "" ||
      formDetails.previous_boarding == "" ||
      formDetails.existing_injury == ""
      // || formDetails.vaccination == ""
    ) {
      err = {
        form: "Please Fill All the fields",
      };
    }
    if (!("anti_tick" in formDetails)) {
      err = { ...err, anti_tick: "Please Select an Option" };
    }
    if (!("deworming_status" in formDetails)) {
      err = { ...err, deworming_status: "Please Select an Option" };
    }
    if (formDetails.diet == "") {
      err = {
        ...err,
        diet: "Please Fill this field (Fill na if Not Applicable)",
      };
    }
    if (formDetails.existing_injury == "") {
      err = {
        ...err,
        existing_injury: "Please Fill this field (Fill na if Not Applicable)",
      };
    }
    if (formDetails.previous_boarding == "") {
      err = {
        ...err,
        previous_boarding: "Please Fill this field (Fill na if Not Applicable)",
      };
    }
    if (vaccination_expired && formDetails.vaccination == "") {
      err = {
        ...err,
        vaccination: "Please Upload Vaccination ",
      };
    }
    if (vaccination_expired && formDetails.expiry == "") {
      err = {
        ...err,
        expiry: "Please Select Vaccination Expiry ",
      };
    }
    setErrors(err);
    return err;
  };

  useEffect(() => {
    const date = new Date();
    setStartDate(date);
    setFormDetails({
      ...formDetails,
      start_date: startDate,
      pet_id: petId,
      owner_id: ownerId,
    });
  }, []);
  useEffect(() => {
    if (startDate != null) {
      setFormDetails({
        ...formDetails,
        start_date: formatToLocalTimeISO(startDate),
        pet_id: petId,
        owner_id: ownerId,
      });
    }
  }, [startDate]);
  useEffect(() => {
    if (expiry != null) {
      setFormDetails({
        ...formDetails,
        expiry: formatToLocalTimeISO(expiry),
        pet_id: petId,
        owner_id: ownerId,
      });
    }
  }, [expiry]);

  const formatToLocalTimeISO = (date) => {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(date - tzoffset).toISOString().slice(0, -1);
    if (localISOTime.includes(".")) {
      localISOTime = localISOTime.split(".")[0];
    }
    if (localISOTime.includes("T")) {
      localISOTime = localISOTime.replace("T", " ");
    }
    return localISOTime;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm() != null) {
      return;
    }
    setIsButtonLoading(true);
    axiosInstance
      .post(`${import.meta.env.VITE_SERVER_URL}/reservation`, formDetails, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log(res);
        toast.success("Reservation Successfully", {
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
        console.log(err);
        setErrors(err);
        if (err.response.status == 401) {
          logout(401);
        }
        toast.error("Error Creating Reservation", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      })
      .finally(() => {
        setIsButtonLoading(false);
        // document.getElementById(`pet_list_modal_${phone}`).close();
        document.getElementById(`enroll_pet_modal_${petId}`).close();
      });
  };

  return (
    <>
      <h3 className="mx-auto m-4 font-bold text-lg">Enroll Pet</h3>
      <div className="card-body pt-4 w-full">
        {errors && <p className="text-center text-red-500"> {errors.form}</p>}

        <form onSubmit={handleFormSubmit} className="mx-auto max-w-lg w-full">
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Name</span>
              {errors && errors.pet_name && (
                <span className="label-text-alt text-red-500">
                  {errors.pet_name}
                </span>
              )}
            </div>
            <input
              name="pet_name"
              type="text"
              value={petName}
              readOnly
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Anti Tick</span>
              {errors && errors.anti_tick && (
                <span className="label-text-alt text-red-500">
                  {errors.anti_tick}
                </span>
              )}
            </div>
            <div className="join ">
              <input
                className="join-item flex-1 btn"
                type="radio"
                value={true}
                onChange={handleInputChange}
                name="anti_tick"
                aria-label="Yes"
                data-type="bool"
              />
              <input
                className="join-item btn flex-1"
                type="radio"
                value={false}
                onChange={handleInputChange}
                name="anti_tick"
                aria-label="No"
                data-type="bool"
              />
            </div>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Deworming Status</span>
              {errors && errors.deworming_status && (
                <span className="label-text-alt text-red-500">
                  {errors.deworming_status}
                </span>
              )}
            </div>
            <div className="join ">
              <input
                className="join-item flex-1 btn"
                type="radio"
                value={true}
                onChange={handleInputChange}
                name="deworming_status"
                aria-label="Yes"
                data-type="bool"
              />
              <input
                className="join-item btn flex-1"
                type="radio"
                value={false}
                onChange={handleInputChange}
                name="deworming_status"
                aria-label="No"
                data-type="bool"
              />
            </div>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Specific Diet</span>
              {errors && errors.diet && (
                <span className="label-text-alt text-red-500">
                  {errors.diet}
                </span>
              )}
            </div>
            <input
              onChange={handleInputChange}
              name="diet"
              type="text"
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Previous Boarding</span>
              {errors && errors.previous_boarding && (
                <span className="label-text-alt text-red-500">
                  {errors.previous_boarding}
                </span>
              )}
            </div>
            <input
              onChange={handleInputChange}
              name="previous_boarding"
              type="text"
              className="input input-bordered w-full max-w-lg"
            />
          </label>

          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Existing Injuries</span>
              {errors && errors.existing_injury && (
                <span className="label-text-alt text-red-500">
                  {errors.existing_injury}
                </span>
              )}
            </div>
            <input
              onChange={handleInputChange}
              name="existing_injury"
              type="text"
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          {vaccination_expired ? (
            <>
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Vaccination</span>
                  {errors && errors.vaccination && (
                    <span className="label-text-alt text-red-500">
                      {errors.vaccination}
                    </span>
                  )}
                </div>
                <input
                  name="vaccination"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-lg"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                />
              </label>
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Vaccination Expiry</span>
                  {errors && errors.expiry && (
                    <span className="label-text-alt text-red-500">
                      {errors.expiry}
                    </span>
                  )}
                </div>
                <DatePicker
                  selected={expiry}
                  onChange={(date) => setExpiry(date)}
                  // startDate={startDateFilter}
                  minDate={new Date()}
                  placeholderText="Vaccination Expiry"
                  className="input w-full"
                  dateFormat={"yyyy-MM-dd"}
                />
              </label>
            </>
          ) : (
            <>
              <label className="form-control w-full max-w-lg">
                <div className="label">
                  <span className="label-text">Existing Injuries</span>
                </div>
                <input
                  readOnly
                  value={"Vaccination already Uploaded"}
                  type="text"
                  className="input input-bordered w-full max-w-lg text-gray-500"
                />
              </label>
            </>
          )}
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Enrollment Time</span>
              {errors && errors.name && (
                <span className="label-text-alt text-red-500">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="join flex flex-col join-vertical">
              <DatePicker
                dateFormat="yyyy-MM-dd HH:mm:ss"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
                showTimeInput
                minDate={subDays(new Date(), 0)}
                customInput={<CustomDateInput />}
              />
              <button
                className="btn join-item w-full hover:btn-primary"
                onClick={() => {
                  const date = new Date();
                  setStartDate(date);
                }}
                type="button"
              >
                Pick Current time
              </button>
            </div>
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
    </>
  );
};

export default EnrollPet;
