import React, { useEffect, useState } from "react";
import LiveReservationsTableRow from "../components/LiveReservationsTableRow";
// import axios from "axios";

import Loading from "../components/Loading";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const LiveReservations = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [filteredLiveReservations, setFilteredLiveReservations] = useState([]);
  const [liveReservations, setLiveReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ filterPet: "", filterOwner: "" });

  useEffect(() => {
    fetchLiveReservations();
  }, []);
  useEffect(() => {
    setFilteredLiveReservations(liveReservations);
  }, [liveReservations]);

  const fetchLiveReservations = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/reservations?status=live`)
      .then((res) => {
        console.log(res.data);
        setLiveReservations(res.data);
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

  useEffect(() => {
    const filteredReservations = liveReservations.filter(
      (reservation) =>
        reservation.pet_name
          .toLowerCase()
          .includes(filters.filterPet.toLowerCase()) &&
        reservation.owner_name
          .toLowerCase()
          .includes(filters.filterOwner.toLowerCase())
    );
    setFilteredLiveReservations(filteredReservations);
  }, [filters]);

  const handleFilterChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="m-8 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        Live Reservations
      </h1>
      <div className="w-full px-2 md:px-8 my-6 gap-2 flex flex-col md:flex-row">
        <label className="input bg-base-300 flex-grow input-bordered flex items-center ">
          <input
            onChange={handleFilterChange}
            name="filterOwner"
            type="text"
            className="grow"
            placeholder="Search By Owner Name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <label className="input bg-base-300 flex-grow input-bordered flex items-center ">
          <input
            name="filterPet"
            onChange={handleFilterChange}
            type="text"
            className="grow"
            placeholder="Search By Pet Name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className=" overflow-x-auto px-2 md:px-8 flex-grow">
        <table className="table bg-base-300">
          {/* head */}
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Owners Name</th>
              <th>Breed</th>
              <th>Diet</th>
              <th>Existing Injuries</th>
              <th>Reservation Started</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-xl text-center">
                  <Loading />
                </td>
              </tr>
            ) : (
              <>
                {filteredLiveReservations.length == 0 ? (
                  <tr>
                    <td colSpan={6} className="text-xl text-center">
                      No Live Reservations
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredLiveReservations.map((reservation, index) => (
                      <LiveReservationsTableRow
                        key={index}
                        reservation={reservation}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LiveReservations;
