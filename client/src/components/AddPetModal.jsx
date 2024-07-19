import React from "react";
import AddPetForm from "./AddPetForm";

const AddPetModal = ({ ownerId, refresh }) => {
  return (
    <>
      <div>
        <button
          className="btn btn-primary w-full"
          onClick={() =>
            document.getElementById(`add_pet_modal_${ownerId}`).showModal()
          }
        >
          Add New Pet
        </button>
        <dialog
          id={`add_pet_modal_${ownerId}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-base-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-square absolute right-2 top-2">
                ✕
              </button>
            </form>
            <AddPetForm ownerId={ownerId} refresh={refresh} />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AddPetModal;
