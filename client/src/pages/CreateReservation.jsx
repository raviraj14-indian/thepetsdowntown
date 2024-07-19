import { useState } from "react";
import AddNewClient from "../components/AddNewClient";
import PetsTable from "../components/PetsTable";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import AddPetModal from "../components/AddPetModal";

const CreateReservation = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(null);
  const [ownerPhoneSearch, setOwnerPhoneSearch] = useState();
  const [ownerPets, setOwnerPets] = useState(null);
  const [isbuttonLoading, setIsbuttonLoading] = useState(false);

  const fetchOwnerPet = async () => {
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/owner/${ownerPhoneSearch}/pets`)
      .then((response) => {
        setOwnerPets(response.data);
      })
      .catch((error) => {
        setOwnerPets(null);
        toast.error(`Oops, Pet Owner Not Found`, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        if (error.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsbuttonLoading(false);
      });
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!ownerPhoneSearch) {
      return setErrors("Please Enter a Phone Number to Search");
    } else if (ownerPhoneSearch.length != 10) {
      return setErrors("Phone Number must be of 10 Digits");
    }
    setErrors(null);
    setIsbuttonLoading(true);
    fetchOwnerPet();
  };
  const handlePhoneChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, "");
    setOwnerPhoneSearch(e.target.value.trim());
  };
  return (
    <>
      <h1 className="m-2 mx-auto sm:m-8 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        Create Reservations
      </h1>
      <div className="w-full flex flex-col px-2 md:px-8 my-6 gap-4 flex-grow ">
        {errors && (
          <span className="text-red-500 mx-auto bg-base-300 px-4 py-3 rounded-xl text-center pb-4">
            {errors}
          </span>
        )}
        <form
          className="mx-auto min-w-96 max-w-xl w-4/6 "
          onSubmit={handlePhoneSubmit}
        >
          <div className="join flex">
            <label className="input join-item flex-grow input-bordered flex items-center bg-base-300 gap-2">
              {/* Search Pet Owner */}
              <input
                name="search"
                onChange={handlePhoneChange}
                type="tel"
                className="grow"
                placeholder="Enter Owners Phone Number"
              />
            </label>
            <button
              className="btn btn-primary join-item"
              id="search_pet_owner"
              type="submit"
            >
              {isbuttonLoading ? "Loading" : "Search Pet Owner"}
            </button>
          </div>
        </form>
        {ownerPets && (
          <div className="w-full max-w-xl mx-auto flex gap-4">
            <div className="flex-1">
              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  setOwnerPets(null);
                }}
              >
                Add New Owner
              </button>
            </div>
            <div className="flex-1">
              <AddPetModal
                refresh={fetchOwnerPet}
                ownerId={ownerPets.owner_id}
              />
            </div>
          </div>
        )}

        {ownerPets ? (
          <>
            <div className="mx-auto w-full max-w-xl">
              <PetsTable ownerId={ownerPets.owner_id} pets={ownerPets.pets} />
            </div>
          </>
        ) : (
          <AddNewClient />
        )}
      </div>
    </>
  );
};

export default CreateReservation;
