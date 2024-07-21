import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const PastReservationDetail = () => {
  const { logout } = useAuth();
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pastReservationDetail, setPastReservationDetail] = useState({});

  useEffect(() => {
    fetchPastReservationDetails();
  }, []);

  const fetchPastReservationDetails = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/reservation/${params.id}`)
      .then((res) => {
        setPastReservationDetail(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        console.log(err);
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1 className="m-8 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        Reservations Details
      </h1>
      <div className="max-h-full bg-base-300 mx-auto max-w-xl w-full p-5 gap-4 flex flex-col rounded-xl">
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {errors && <h2>Error : {errors}</h2>}
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Owners Name:</span>
              <input
                name="Owner_name"
                type="text"
                value={pastReservationDetail.owner_name}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Pet Name:</span>
              <input
                name="pet_name"
                type="text"
                value={pastReservationDetail.pet_name}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Start Date:</span>
              <input
                name="start_date"
                type="text"
                value={pastReservationDetail.start_date}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">End Date:</span>
              <input
                name="end_date"
                type="text"
                className={`grow ${
                  pastReservationDetail.end_date ? `` : `text-gray-500`
                }`}
                value={
                  pastReservationDetail.end_date
                    ? pastReservationDetail.end_date
                    : "Reservation is Live Now"
                }
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Specific Diet:</span>
              <input
                name="end_date"
                type="text"
                value={pastReservationDetail.diet}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Existing Injury:</span>
              <input
                name="end_date"
                type="text"
                value={pastReservationDetail.existing_injury}
                className="grow"
              />
            </label>
            {pastReservationDetail.end_date ? (
              <Link
                to={`/invoice/${params.id}`}
                className="btn btn-primary"
                state={{ ...pastReservationDetail }}
              >
                Download Invoice
              </Link>
            ) : (
              <Link to={`/live-reservations`} className="btn btn-primary">
                Release
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PastReservationDetail;
