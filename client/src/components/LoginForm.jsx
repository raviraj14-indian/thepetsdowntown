import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/login`, formData)
      .then((res) => {
        toast.success("Logged in Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        Cookies.set("token", res.data.token, { expires: 7 });
        login(res.data.token);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`),
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          };
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  return (
    <>
      <div className="card mx-auto bg-base-300 shadow-xl min-w-96 max-w-xl w-4/6">
        <img
          src="/logo-bg-white-removebg.png"
          className=" mt-8 mx-auto"
          width={200}
        />

        <div className="card-body pt-4 w-full">
          <h3 className="mx-auto m-4 font-bold text-center text-lg">Login</h3>
          <form onSubmit={handleFormSubmit} className="mx-auto max-w-lg w-full">
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Userame</span>
              </div>
              <input
                onChange={handleInputChange}
                name="username"
                type="text"
                className="input input-bordered w-full max-w-lg"
              />
            </label>
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                onChange={handleInputChange}
                name="password"
                type="password"
                className="input input-bordered w-full max-w-lg"
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

export default LoginForm;
