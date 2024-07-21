import React from "react";
import { Link } from "react-router-dom";

const PastReservationsTableRow = ({ reservation, index }) => {
  
  return (
    <>
      <tr className="hover">
        <td>{index}</td>
        <td>{reservation.owner_name}</td>
        <td>{reservation.pet_name}</td>
        <td> {reservation.start_date} </td>
        <td> {reservation.end_date} </td>
        <td>
          <Link
            role="button"
            className="btn btn-primary"
            to={`/past-reservation/${reservation.id}`}
            state={reservation}
          >
            View Details
          </Link>
        </td>
      </tr>
    </>
  );
};

export default PastReservationsTableRow;
