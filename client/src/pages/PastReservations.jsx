import React, { useEffect, useState } from "react";
import PastReservationsTableRow from "../components/PastReservationsTableRow";
import axiosInstance from "../../api/axiosInstance";
import DatePicker from "react-datepicker";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const PastReservations = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pastReservations, setPastReservations] = useState([]);
  const [filteredPastReservations, setFilteredPastReservations] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState(new Date("2023-01-01"));
  const [endDateFilter, setEndDateFilter] = useState(new Date());
  const [filters, setFilters] = useState({ filterPet: "", filterOwner: "" });

  useEffect(() => {
    fetchPastReservations();
  }, []);

  const fetchPastReservations = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/reservations?status=released`)
      .then((res) => {
        setPastReservations(res.data);
        setFilteredPastReservations(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(pastReservations);
    const filteredReservations = pastReservations.filter(
      (reservation) =>
        reservation.pet_name
          .toLowerCase()
          .includes(filters.filterPet.toLowerCase()) &&
        reservation.owner_name
          .toLowerCase()
          .includes(filters.filterOwner.toLowerCase()) 
          &&Date.parse(reservation.start_date) >= Date.parse(startDateFilter) &&
          Date.parse(reservation.end_date) <= Date.parse(endDateFilter)
          );
          // console.log( Date.parse(reservation.start_date))  
          
          console.log(Date.parse(endDateFilter))
          console.log(Date.parse(startDateFilter))
          console.log(filteredPastReservations)
    setFilteredPastReservations(filteredReservations);
  }, [filters, startDateFilter, endDateFilter]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="m-8 text-3xl sm:text-4xl bg-opacity-70  bg-base-100 rounded-lg font-semibold p-5 text-center sm:text-left w-max">
        Past Reservations
      </h1>
      <div className="w-full px-2 md:px-8 my-6 gap-2 flex flex-col md:flex-row ">
        <label className="input flex-grow bg-base-300 input-bordered flex items-center ">
          <input
            name="filterOwner"
            onChange={handleFilterChange}
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
        <label className="input flex-grow bg-base-300 input-bordered flex items-center ">
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
        <div className="tooltip flex-grow" data-tip="Start Date">
        <label className="input flex-grow w-full bg-base-300 input-bordered flex items-center ">
          <DatePicker
          className="w-full"
            selected={startDateFilter}
            onChange={(date) => setStartDateFilter(date)}
            selectsStart
            startDate={startDateFilter}
            endDate={endDateFilter}
            placeholderText="Filter Dates After"
            dateFormat={"yyyy-MM-dd"}
            />
        </label>
            </div>
        <div className="tooltip flex-grow" data-tip="End Date">
        <label className="input flex-grow w-full bg-base-300 input-bordered flex items-center ">
          <DatePicker
          className="w-full"
            selected={endDateFilter}
            onChange={(date) => setEndDateFilter(date)}
            selectsEnd
            startDate={startDateFilter}
            endDate={endDateFilter}
            minDate={startDateFilter}
            placeholderText="Filter Dates Before"
            dateFormat={"yyyy-MM-dd"}
            />
        </label>
            </div>
      </div>
      <div className=" overflow-x-auto px-2 md:px-8 flex-grow">
        <table className="table bg-base-300">
          <thead>
            <tr>
              <th></th>
              <th>Owners Name</th>
              <th>Pet Name</th>
              <th>Reservation Started</th>
              <th>Reservation Ended</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-2xl  text-center">
                  <Loading />
                </td>
              </tr>
            ) : (
              <>
                {filteredPastReservations.length == 0 ? (
                  <tr>
                    <td colSpan={6} className="text-2xl  text-center">
                      No Past Reservations
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredPastReservations.map((reservation, index) => (
                      <PastReservationsTableRow
                        key={reservation.id}
                        index={index + 1}
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

export default PastReservations;
