import React from "react";
import EnrollPet from "./EnrollPet";

const EnrollPetModal = ({ ownerId, petId, petName, vaccination_expired }) => {
  return (
    <>
      <div>
        <button
          className="btn btn-primary min-w-max"
          onClick={() =>
            document.getElementById(`enroll_pet_modal_${petId}`).showModal()
          }
        >
          Enroll Pet
        </button>
        <dialog
          id={`enroll_pet_modal_${petId}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-base-300">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <EnrollPet
              petName={petName}
              petId={petId}
              ownerId={ownerId}
              vaccination_expired={vaccination_expired}
            />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default EnrollPetModal;
