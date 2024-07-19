import React from "react";
// import EnrollPetModal from "./EnrollPetModal";
import { Link } from "react-router-dom";

const PetListRow = ({ index, pet }) => {
  console.log(pet);
  return (
    <tr>
      <td className="px-8">{index}</td>
      <td className="w-full">{pet.name}</td>
      <td className="w-full">
        <Link
          className="btn btn-primary btn-outline min-w-max"
          to={`/pet-details/${pet.id}`}
          state={pet}
        >
          View Details
        </Link>
      </td>
      {/* <td className="px-8">
        <EnrollPetModal
          ownerId={pet.owner_id}
          petId={pet.id}
          petName={pet.name}
          vaccination_expired={pet.vaccination_expired}
        />
      </td> */}
    </tr>
  );
};

export default PetListRow;
