import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import DuplicateInvoicePdf from "../components/DuplicateInvoicePdf";
import Loading from "../components/Loading";
import axiosInstance from "../../api/axiosInstance";

const InvoicePage = () => {
  const params = useParams();
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (params.id) {
      console.log("param id", params.id);
      fetchDuplicateInvoice();
    } else if (location.state) {
      console.log("state", location.state);
      setInvoiceDetails({ ...location.state });
    }
  }, []);

  useEffect(() => {
    console.log(invoiceDetails);
  }, [invoiceDetails]);

  const fetchDuplicateInvoice = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/billing/${params.id}`)
      .then((res) => {
        console.log(res.data);
        console.log(location.state);
        const sum =
          (res.data.total_boarding_charge
            ? res.data.total_boarding_charge
            : 0) + (res.data.daycare_charge ? res.data.daycare_charge : 0);
        setInvoiceDetails({
          totalBoardingCharges: res.data.total_boarding_charge,
          bordingDays: res.data.no_of_days,
          dayCareHours: res.data.day_care_hours,
          dayCareMins: res.data.day_care_minutes,
          totalDayCareCharges: res.data.daycare_charge,
          boardingChargesPerDay: res.data.boarding_charge_per_day,
          discountPercentage: res.data.discount,
          totalAmount: res.data.amount,
          sum: sum,
          invoice_no: res.data.id,
          ...location.state,
        });
      })
      .catch((err) => {
        setErrors(err.message);
        console.log(err);
        if (err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const downloadPDF = () => {
    const capture = document.querySelector("#recipt");
    html2canvas(capture, {
      quality: 1,
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(
        `invoice-${invoiceDetails.pet_name}-${invoiceDetails.end_date}.pdf`
      );
    });
  };
  return (
    <>
      <div className="mx-auto p-8 flex flex-col justify-between gap-8">
        {isLoading && invoiceDetails == null ? (
          <Loading />
        ) : (
          <>
            <div className="flex gap-2">
              <Link
                className="btn btn-primary flex-1"
                // to={"/live-reservations"}
                to={-1}
              >
                Back
              </Link>
              <button className="btn btn-primary flex-1" onClick={downloadPDF}>
                Download Invoice
              </button>
            </div>
            <DuplicateInvoicePdf invoiceDetails={invoiceDetails} />
          </>
        )}
      </div>
    </>
  );
};

export default InvoicePage;
