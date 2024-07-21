import React from "react";
import PetsTable from "./PetsTable";
import AddPetModal from "./AddPetModal";

const PetsListModal = ({ pets, ownerId, phone, fetchAllOwners }) => {
  console.log(pets);
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() =>
          document.getElementById(`pet_list_modal_${phone}`).showModal()
        }
      >
        View Pets - ({pets.length} pets)
      </button>
      <dialog
        id={`pet_list_modal_${phone}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box ">
          <PetsTable pets={pets} />
          <div className="modal-action flex justify-between">
            <AddPetModal ownerId={ownerId} refresh={fetchAllOwners} />
            <form method="dialog">
              <button className="btn btn-outline">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PetsListModal;
