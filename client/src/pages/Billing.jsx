import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import InvoicePdf from "../components/InvoicePdf";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const Billing = () => {
  const { logout } = useAuth();
  const [errors, setErrors] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});
  const [summaryDetails, setSummaryDetails] = useState({
    boardingChargesPerDay: 0,
    totalBoardingCharges: 0,
    totalDayCareCharges: 0,
    discountPercentage: 0,
    sum: 0,
    totalAmount: 0,
  });
  const location = useLocation();

  const navigateTo = useNavigate();
  useEffect(() => {
    calculateDateAndTime();
  }, []);

  const calculateDateAndTime = () => {
    const start = new Date(location.state.start_date);
    const end = new Date(location.state.end_date);
    const duration = end - start;
    const minInMS = 60000;
    const hourInMS = 3600000;
    const dayInMS = 86400000;
    var bordingDays = Math.floor(duration / dayInMS);
    var dayCareHours = Math.floor(
      (duration - bordingDays * dayInMS) / hourInMS
    );
    var dayCareMins = Math.floor(
      (duration - (dayCareHours * hourInMS + bordingDays * dayInMS)) / minInMS
    );

    if (bordingDays == 0 && start.getDate() != end.getDate()) {
      bordingDays = 1;
      dayCareHours = dayCareMins = 0;
    }

    setBillingDetails({
      ...location.state,
      bordingDays: bordingDays,
      dayCareHours: dayCareHours,
      dayCareMins: dayCareMins,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    const formData = {
      owner_id: billingDetails.owner_id,
      pet_id: billingDetails.pet_id,
      reservation_id: billingDetails.id,
      no_of_days: billingDetails.bordingDays,
      boarding_charge_per_day: summaryDetails.boardingChargesPerDay,
      total_boarding_charge: summaryDetails.totalBoardingCharges,
      daycare_charge: summaryDetails.totalDayCareCharges,
      day_care_hours: billingDetails.dayCareHours,
      day_care_minutes: billingDetails.dayCareMins,
      discount: summaryDetails.discountPercentage,
      amount: summaryDetails.totalAmount,
      end_date: billingDetails.end_date,
    };

    axiosInstance
      .post(`${import.meta.env.VITE_SERVER_URL}/billing`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        navigateTo("/invoice", {
          state: {
            ...billingDetails,
            ...summaryDetails,
            invoice_no: res.data.id,
          },
        });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setErrors(err);
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  };

  return (
    <>
      <h1 className="m-4 mx-auto text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 px-4 py-3 text-center sm:text-left w-max">
        Billing
      </h1>

      <div className="flex w-full flex-col xl:flex-row justify-evenly items-center xl:items-start">
        <div className="card-body pt-4 w-full max-w-2xl">
          <h3 className="mx-auto m-2 font-bold bg-base-300 px-3 py-2 rounded-xl text-lg">
            Order Summary
          </h3>
          <form
            onSubmit={handleFormSubmit}
            className="mx-auto max-w-lg flex flex-col gap-4 w-full"
          >
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Owners Name:</span>
              <input
                name="Owner_name"
                type="text"
                value={billingDetails.owner_name}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Pet Name:</span>
              <input
                name="pet_name"
                type="text"
                value={billingDetails.pet_name}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">Start Date:</span>
              <input
                name="start_date"
                type="text"
                value={billingDetails.start_date}
                className="grow"
              />
            </label>
            <label className="input bg-base-300 input-bordered flex items-center gap-2">
              <span className="font-bold w-1/4">End Date:</span>
              <input
                name="end_date"
                type="text"
                value={billingDetails.end_date}
                className="grow"
              />
            </label>

            <OrderSummary
              billingDetails={billingDetails}
              summaryDetails={summaryDetails}
              setSummaryDetails={setSummaryDetails}
            />

            <button
              disabled={isButtonLoading ? true : false}
              className="btn btn-primary mt-6 form-control w-full "
              type="submit"
            >
              {isButtonLoading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
        <div className="card-body pt-4 w-full h-full items-center flex flex-col justify-between max-w-2xl">
          <InvoicePdf
            billingDetails={billingDetails}
            summaryDetails={summaryDetails}
          />
        </div>
      </div>
    </>
  );
};

export default Billing;

// {
//   "id": 1,
//   "owner_id": 2,
//   "pet_id": 2,
//   "owner_name": "Dhruv",
//   "pet_name": "Musky",
//   "diet": "Kuch bhi khaa leta hai ye ",
//   "breed": "Labrador",
//   "existing_injury": "kuch na kuch laga rehta",
//   "start_date": "2024-06-30 18:35:00",
//   "end_date": "2024-06-30T18:35:00"
// }
// {
//   "id": 10,
//   "owner_id": 1,
//   "pet_id": 7,
//   "owner_name": "Ravi Raj",
//   "pet_name": "Dusk",
//   "diet": "Kuch bhi khaa leta hai ye ",
//   "breed": "Labrador",
//   "existing_injury": "kuch na kuch laga rehta",
//   "start_date": "2024-06-20 13:10:20",
//   "end_date": "2024-06-26T02:14:19",
//   "bordingDays": 5,
//   "dayCareHours": 13,
//   "dayCareMins": 3,
//   "boardingChargesPerDay": 200,
//   "totalBoardingCharges": 1000,
//   "totalDayCareCharges": 20,
//   "discountPercentage": 10,
//   "sum": 1020,
//   "totalAmount": 918
// }
