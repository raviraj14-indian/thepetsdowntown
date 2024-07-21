import React from "react";
import PetsListModal from "./PetsListModal";
import { Link } from "react-router-dom";

const OwnerTableRow = ({
  ownerId,
  index,
  name,
  phone,
  pets,
  alternate_name,
  alternate_phone,
  address,
  fetchAllOwners,
}) => {
  return (
    <tr className="hover">
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{alternate_name}</td>
      <td>{alternate_phone}</td>
      <td>{address}</td>
      <td>
        <Link
          className="btn btn-primary btn-outline"
          to={`/doc/owner-identification/${ownerId}`}
          target="_blank"
        >
          View Identity Proof
        </Link>{" "}
      </td>
      <td>
        <PetsListModal
          phone={phone}
          ownerId={ownerId}
          pets={pets}
          fetchAllOwners={fetchAllOwners}
        />
      </td>
    </tr>
  );
};

export default OwnerTableRow;
