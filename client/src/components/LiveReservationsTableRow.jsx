import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  setHours,
  setMinutes,
  subDays,
} from "react-datepicker/dist/date_utils.d.ts";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
// import Datepicker from "react-tailwindcss-datepicker";

const LiveReservationsTableRow = ({ reservation }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [endDate, setEndDate] = useState();
  const [errors, setErrors] = useState();

  const test_reservation = {
    id: 11,
    owner_name: "Ravi Raj",
    pet_name: "Musk",
    diet: "Kuch bhi khaa leta hai ye ",
    breed: "Labrador",
    existing_injury: "kuch na kuch laga rehta",
    start_date: "2024-06-20 22:25:44",
    end_date: "2024-06-20T22:43:16",
    owner_id: 1,
    pet_id: 1,
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-outline join-item w-full btn-primary"
      onClick={onClick}
      ref={ref}
      type="button"
    >
      {value}
    </button>
  ));

  useEffect(() => {
    if (Date.parse(reservation.start_date) + 3600000 > Date.now()) {
      setEndDate(Date.parse(reservation.start_date) + 3600000);
      return;
    }
    const date = new Date();
    setEndDate(date);
  }, []);

  const navigateTo = useNavigate();

  const formatToLocalTimeISO = (date) => {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(date - tzoffset).toISOString().slice(0, -1);
    if (localISOTime.includes(".")) {
      localISOTime = localISOTime.split(".")[0];
    }
    if (localISOTime.includes("T")) {
      localISOTime = localISOTime.replace("T", " ");
    }
    console.log(localISOTime);
    return localISOTime;
  };

  const handleReleaseSubmit = () => {
    navigateTo("/billing", {
      state: { ...reservation, end_date: formatToLocalTimeISO(endDate) },
    });
  };

  return (
    <>
      <tr className="hover">
        <td>{reservation.pet_name}</td>
        <td>{reservation.owner_name}</td>
        <td>{reservation.breed}</td>
        <td>{reservation.diet}</td>
        <td>{reservation.existing_injury}</td>
        <td> {reservation.start_date} </td>
        <td>
          <DatePicker
            dateFormat="yyyy-MM-dd HH:mm:ss"
            selected={endDate}
            onChange={(date) => {
              if (
                Date.parse(date) <=
                Date.parse(reservation.start_date) + 3600000
              ) {
                setEndDate(Date.parse(reservation.start_date) + 3600000);
                return;
              }
              setEndDate(date);
            }}
            showTimeInput
            minDate={subDays(new Date(reservation.start_date), 0)}
            minTime={setHours(setMinutes(new Date(), 0), 17)}
            customInput={<CustomDateInput />}
          />
        </td>
        <td>
          <button
            role="button"
            className="btn btn-primary"
            onClick={handleReleaseSubmit}
          >
            Release
          </button>
        </td>
      </tr>
    </>
  );
};

export default LiveReservationsTableRow;
