// import axios from "axios";
import axiosInstance from "../../api/axiosInstance";
import React, { useEffect, useState } from "react";
import OwnerTableRow from "../components/OwnerTableRow";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const Owners = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllOwners();
  }, []);
  useEffect(() => {
    setFilteredOwners(owners);
  }, [owners]);

  const fetchAllOwners = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/owners`)
      .then((res) => {
        setOwners(res.data);
        console.log(res.data);
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

  const handleOwnerFilterChange = (e) => {
    const filteredOwners = owners.filter((owner) =>
      owner.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOwners(filteredOwners);
  };

  return (
    <>
      <h1 className="m-8 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        All Owners
      </h1>
      <div className="overflow-x-auto  px-2 md:px-8 flex-grow">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {errors != null ? (
              <>
                <h3 className="text-red-500">
                  Error Fetching Owners Data: {errors}
                </h3>
              </>
            ) : (
              <>
                <div className="w-full px-2 md:px-8 my-6 gap-2 flex flex-col md:flex-row">
                  <label className="input flex-grow input-bordered flex items-center bg-base-300">
                    <input
                      name="filter"
                      onChange={handleOwnerFilterChange}
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
                </div>{" "}
                <table className="table bg-base-300">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Alternate Contact Name</th>
                      <th>Alternate Contact Phone</th>
                      <th>Address</th>
                      <th>Identity Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOwners.length == 0 ? (
                      <tr>
                        <td colSpan={7} className="text-2xl  text-center">
                          No Owners Found
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredOwners.map((owner, index) => (
                          <>
                            <OwnerTableRow
                              index={index}
                              key={index}
                              ownerId={owner.id}
                              name={owner.name}
                              phone={owner.phone}
                              pets={owner.pets}
                              alternate_name={owner.alternate_name}
                              alternate_phone={owner.alternate_phone}
                              address={owner.address}
                              fetchAllOwners={fetchAllOwners}
                            />
                          </>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Owners;
