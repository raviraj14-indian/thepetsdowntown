import { Link, useLocation, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import PastReservationsTableRow from "../components/PastReservationsTableRow";
import PetsPastReservationRow from "../components/PetsPastReservationRow";

const PetDetails = () => {
  const { logout } = useAuth();
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [petDetails, setPetDetails] = useState({});

  useEffect(() => {
    fetchPetDetails();
  }, []);

  const fetchPetDetails = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/pet/${params.id}`)
      .then((res) => {
        setPetDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        // setErrors("Pet Doesn't Exist");
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
        Pet Details
      </h1>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {errors ? (
            <h2 className="text-3xl text-center font-semibold">
              Pet Doesn't exists
            </h2>
          ) : (
            <>
              <div className="max-h-full bg-base-300 mx-auto max-w-xl w-full p-5 gap-4 flex flex-col rounded-xl">
                <label className="input bg-base-300 input-bordered flex items-center gap-2">
                  <span className="font-bold w-1/4">Pet Name:</span>
                  <input
                    name="name"
                    type="text"
                    readOnly
                    value={petDetails.name}
                    className="grow"
                  />
                </label>
                <label className="input bg-base-300 input-bordered flex items-center gap-2">
                  <span className="font-bold w-1/4">Breed:</span>
                  <input
                    name="breed"
                    type="text"
                    readOnly
                    value={petDetails.breed}
                    className="grow"
                  />
                </label>
                <label className="input bg-base-300 input-bordered flex items-center gap-2">
                  <span className="font-bold w-1/4">Gender:</span>
                  <input
                    name="gender"
                    type="text"
                    readOnly
                    value={petDetails.gender}
                    className="grow"
                  />
                </label>
                <label className="input bg-base-300 input-bordered flex items-center gap-2">
                  <span className="font-bold w-1/4">Age:</span>
                  <input
                    name="age"
                    type="text"
                    readOnly
                    value={petDetails.age}
                    className="grow"
                  />
                </label>
                <label className="input bg-base-300 input-bordered flex items-center gap-2">
                  <span className="font-bold w-1/4">Vaccination:</span>
                  <input
                    name="vaccination"
                    type="text"
                    readOnly
                    value={
                      petDetails.vaccination_expired
                        ? "Not Uploaded"
                        : "Uploaded"
                    }
                    className="grow"
                  />
                </label>
                {!petDetails.vaccination_expired && (
                  <Link
                    to={`/doc/pet-vaccination/${params.id}`}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    View Vaccination
                  </Link>
                )}
              </div>
              <div className="  mx-auto w-full  gap-4 flex flex-col rounded-xl">
                <div className=" overflow-x-auto px-2 md:px-8 flex-grow">
                  <h3 className="mx-auto bg-base-300 rounded-xl max-w-max p-4 m-4 font-bold text-center text-lg">
                    Past Reservations of {petDetails.name}
                  </h3>
                  <table className="table bg-base-300">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Reservation Started</th>
                        <th>Reservation Ended</th>
                        <th>Diet</th>
                        <th>Existing Injury</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {petDetails.reservations.length == 0 ? (
                        <tr>
                          <td colSpan={6} className="text-2xl  text-center">
                            No Past Reservations
                          </td>
                        </tr>
                      ) : (
                        <>
                          {petDetails.reservations.map((reservation, index) => (
                            <PetsPastReservationRow
                              key={reservation.id}
                              index={index + 1}
                              reservation={reservation}
                            />
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PetDetails;
