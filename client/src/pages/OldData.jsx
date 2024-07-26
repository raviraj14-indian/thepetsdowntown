// Date       string `db:"date" json:"date,omitempty"`
// 	Amount     int    `db:"amount" json:"amount,omitempty"`
// 	ClientName string `db:"client_name" json:"client_name,omitempty"`
// 	PetName    string `db:"pet_name" json:"pet_name,omitempty"`

import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import OldDataTableRow from "../components/OldDataTableRow";
import DatePicker from "react-datepicker";

const OldData = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [filteredOldData, setFilteredOldData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startDateFilter, setStartDateFilter] = useState();
  const [endDateFilter, setEndDateFilter] = useState();
  const [filters, setFilters] = useState({
    filterPet: "",
    filterOwner: "",
    filterAmount: "",
  });

  useEffect(() => {
    fetchOldData();
  }, []);
  useEffect(() => {
    setFilteredOldData(oldData);
    setIsLoading(false);
  }, [oldData]);

  const fetchOldData = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/old-data`)
      .then((res) => {
        setOldData(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        console.log(err);
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    // setIsLoading(true);
    const filteredOldData = oldData.filter((data) => {
      return (
        ((!data.pet_name &&
          (filters.filterPet == "" || filters.filterPet == "-")) ||
          (data.pet_name &&
            data.pet_name
              .toLowerCase()
              .includes(filters.filterPet.toLowerCase()))) &&
        data.client_name
          .toLowerCase()
          .includes(filters.filterOwner.toLowerCase()) &&
        (!filters.filterAmount ||
          data.amount.toString() == filters.filterAmount.toLowerCase()) &&
        (endDateFilter == null ||
          Date.parse(data.date) <= Date.parse(endDateFilter)) &&
        (endDateFilter == null ||
          Date.parse(data.date) >= Date.parse(startDateFilter))
      );
    });
    setFilteredOldData(filteredOldData);
    // setIsLoading(false);
  }, [filters, startDateFilter, endDateFilter]);

  useEffect(() => {
    console.log(startDateFilter);
    console.log(endDateFilter);
  }, [startDateFilter, endDateFilter]);
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="m-8 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        Old Data
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
        <label className="input flex-grow bg-base-300 input-bordered flex items-center ">
          <DatePicker
            placeholderText="Filter By Dates"
            swapRange
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDateFilter(start);
              setEndDateFilter(end);
            }}
            startDate={startDateFilter}
            endDate={endDateFilter}
            selectsRange
            isClearable={true}
          />
        </label>
        <label className="input bg-base-300 flex-grow input-bordered flex items-center ">
          <input
            name="filterAmount"
            onChange={handleFilterChange}
            type="text"
            className="grow"
            placeholder="Search By Amount"
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
              <th></th>
              <th>Owners Name</th>
              <th>Pet Name</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-xl text-center">
                  <Loading />
                </td>
              </tr>
            ) : (
              <>
                {filteredOldData.length == 0 ? (
                  <tr>
                    <td colSpan={5} className="text-xl text-center">
                      No Old Data Available
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredOldData.map((rowData, index) => (
                      <OldDataTableRow
                        index={index + 1}
                        key={index}
                        rowData={rowData}
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

export default OldData;
