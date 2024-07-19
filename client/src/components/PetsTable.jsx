import React from "react";
import PetListRow from "./PetListRow";

const PetsTable = ({ pets, ownerId }) => {
  return (
    <>
      <div className="bg-base-300 rounded-2xl w-full">
        <h3 className="font-bold text-lg px-8 py-4">Pets</h3>
        <div className="overflow-x-auto w-full">
          <table className="table bg-base-300">
            <tbody>
              {pets.length ? (
                pets.map((pet, index) => (
                  <PetListRow
                    index={index + 1}
                    key={index}
                    pet={pet}
                    ownerId={ownerId}
                  />
                ))
              ) : (
                <tr>
                  <td>No Pets added yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PetsTable;
