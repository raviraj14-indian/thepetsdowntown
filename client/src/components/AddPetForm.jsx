import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const AddPetForm = ({ ownerId, refresh }) => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [formDetails, setFormDetails] = useState({
    owner_id: ownerId,
    name: "",
    breed: "",
    age: "",
    gender: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.dataset.type == "bool") {
      {
        e.target.value == "true"
          ? setFormDetails({ ...formDetails, [e.target.name]: true })
          : setFormDetails({ ...formDetails, [e.target.name]: false });
      }
    } else if (e.target.id == "age") {
      setFormDetails({
        ...formDetails,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
    }
  };

  const handleFileUpload = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.files[0] });
  };

  const validateForm = () => {
    setErrors(null);
    var err = null;
    if (
      formDetails.name == "" ||
      formDetails.breed == "" ||
      formDetails.age == "" ||
      formDetails.gender == "" ||
      !("is_sterilized" in formDetails)
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
    if (formDetails.breed == "") {
      err = { ...err, breed: "Please Select a Breed" };
    }
    if (formDetails.age == "") {
      err = { ...err, age: "Please Fill this field" };
    }
    if (formDetails.gender == "") {
      err = { ...err, gender: "Please Select an Option" };
    }
    if (!("is_sterilized" in formDetails)) {
      err = { ...err, is_sterilized: "Please Select an Option" };
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
      .post(`${import.meta.env.VITE_SERVER_URL}/pet`, formDetails)
      .then((res) => {
        toast.success("New Pet Info Saved Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        {
          refresh && refresh();
        }
      })
      .catch((err) => {
        toast.error("Error Adding Pet", {
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
        setErrors(err);
      })
      .finally(() => {
        setIsButtonLoading(false);
        document.getElementById(`add_pet_modal_${ownerId}`).close();
      });
  };

  return (
    <>
      <h3 className="mx-auto m-4 font-bold text-center text-lg">Add New Pet</h3>
      <div className="card-body pt-4 w-full">
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
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Breed</span>
              {errors && errors.breed && (
                <span className="label-text-alt text-red-500">
                  {errors.breed}
                </span>
              )}
            </div>
            <select
              onChange={handleInputChange}
              id="breed"
              name="breed"
              className="select select-bordered w-full max-w-lg"
            >
              <option disabled selected>
                Select a Breed
              </option>
              <option value="Indie">Indie</option>
              <option value="Labrador">Labrador</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Beagle">Beagle</option>
              <option value="Doberman">Doberman</option>
              <option value="Shitzu">Shitzu</option>
              <option value="German Shepherd">German Shepherd</option>
              <option value="Pug">Pug</option>
              <option value="Pomeranian">Pomeranian</option>
              <option value="Boxer">Boxer</option>
              <option value="Rottweiler">Rottweiler</option>
              <option value="Indie cat">Indie cat</option>
              <option value="Persian Cat">Persian Cat</option>
            </select>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Age</span>
              {errors && errors.age && (
                <span className="label-text-alt text-red-500">
                  {errors.age}
                </span>
              )}
            </div>
            <select
              id="age"
              name="age"
              onChange={handleInputChange}
              className="select select-bordered"
              required
            >
              <option disabled selected>
                Select age
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
            </select>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Gender</span>
              {errors && errors.gender && (
                <span className="label-text-alt text-red-500">
                  {errors.gender}
                </span>
              )}
            </div>
            <div className="join">
              <input
                className="join-item flex-1 btn"
                type="radio"
                value="male"
                name="gender"
                aria-label="Male"
                onChange={handleInputChange}
              />
              <input
                className="join-item flex-1 btn"
                type="radio"
                value="female"
                name="gender"
                aria-label="Female"
                onChange={handleInputChange}
              />
            </div>
          </label>
          <label className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Is sterilized?</span>
              {errors && errors.is_sterilized && (
                <span className="label-text-alt text-red-500">
                  {errors.is_sterilized}
                </span>
              )}
            </div>
            <div className="join ">
              <input
                className="join-item btn flex-1"
                type="radio"
                value={true}
                onChange={handleInputChange}
                name="is_sterilized"
                aria-label="Yes"
                data-type="bool"
              />
              <input
                className="join-item btn flex-1"
                type="radio"
                value={false}
                onChange={handleInputChange}
                name="is_sterilized"
                aria-label="No"
                data-type="bool"
              />
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

export default AddPetForm;
