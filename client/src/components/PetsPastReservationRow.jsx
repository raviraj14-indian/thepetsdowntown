import React from "react";
import { Link } from "react-router-dom";

const PetsPastReservationRow = ({ reservation, index }) => {
  console.log(reservation);
  return (
    <>
      <tr className="hover">
        <td>{index}</td>
        <td> {reservation.start_date} </td>
        <td className={`grow ${reservation.end_date ? `` : `text-gray-500`}`}>
          {reservation.end_date
            ? reservation.end_date
            : "Reservation is Live Now"}{" "}
        </td>
        <td>{reservation.diet}</td>
        <td>{reservation.existing_injury}</td>
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

export default PetsPastReservationRow;
