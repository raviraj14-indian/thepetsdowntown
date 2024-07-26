import React from "react";
import { ToWords } from "to-words";

const InvoicePdf = ({ billingDetails, summaryDetails }) => {
  const toWords = new ToWords();
  var totalInWords = toWords.convert(summaryDetails.totalAmount, {
    currency: true,
  });
  return (
    <>
      <div className="card bg-base-300 shadow-xl">
        <h3 className="mx-auto mt-2 font-bold bg-base-300 px-3 pt-2 rounded-xl text-lg">
          Invoice Preview
        </h3>
        <div className="card-body">
          <div className="recipt text-black w-[672px] h-[950px] flex  flex-col bg-white px-10 py-10 ">
            <div className="header flex justify-between">
              <div className="div text-xs">
                <h2 className="text-xl font-bold ">The Pets Downtown</h2>
                <p>Near Old Wakad - Balewadi Bridge, Ahead of Wakad</p>
                <p>
                  Gaothan Smashan Bhumi, Patil Nagar, Balewadi Pune - 411045
                </p>
                <p>Phone no. : 9604455664</p>
                <p>Email : thepetsdowntown@gmail.com</p>
              </div>
              <div className="div">
                <img src="/logo-bg-color-sq.jpg" width={90} height={90} />
              </div>
            </div>
            <div className="body flex-grow">
              <div className="h-1 bg-[#42a6c6] my-2"></div>
              <h4 className="text-2xl text-center font-bold text-[#42a6c6]">
                Tax Invoice
              </h4>
              <div className="my-1 flex w-full justify-between">
                <div className="left">
                  <h6 className="font-bold">Bill To:</h6>
                  <p className="">Name: {billingDetails.owner_name}</p>
                  <p className="">Phone: {billingDetails.address}</p>
                  <p className="">Address: {billingDetails.phone}</p>
                </div>
                <div className="right">
                  <h6 className="font-bold">Invoice Details:</h6>
                  <p className="">{`Invoice No.: ${
                    billingDetails.invoice_no
                      ? billingDetails.invoice_no
                      : `xxxx`
                  }`}</p>
                  <p className="">
                    {`Invoice Date.: ${
                      new Date(billingDetails.end_date)
                        .toLocaleString()
                        .split(",")[0]
                    }`}
                  </p>
                </div>
              </div>
              <div className="my-2 w-full ">
                <h6 className="font-bold">Reservation Details:</h6>
                <div className="flex">
                  <p>
                    Start Date:{" "}
                    {new Date(billingDetails.start_date).toLocaleString()}
                  </p>
                  <p className="text-right">
                    End Date:{" "}
                    {new Date(billingDetails.end_date).toLocaleString()}
                  </p>
                </div>
              </div>
              <h6 className="font-bold  my-2">Order Summary:</h6>
              <table className="table table-sm h-min">
                <thead className="text-white bg-[#42a6c6]">
                  <tr>
                    <th>Job</th>
                    <th>Quantity</th>
                    <th></th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryDetails.totalBoardingCharges != 0 ? (
                    <tr>
                      <td className=" flex-grow font-bold">Boarding</td>
                      <td>{`${billingDetails.bordingDays} days`}</td>
                      <td> {summaryDetails.boardingChargesPerDay} / per day</td>
                      <td className="font-bold">
                        {summaryDetails.totalBoardingCharges}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {summaryDetails.totalDayCareCharges != 0 ? (
                    <tr>
                      <td className=" font-bold">Day Care</td>
                      <td colSpan={2}>
                        {billingDetails.dayCareHours} hrs,{" "}
                        {billingDetails.dayCareMins} mins
                      </td>
                      <td className="font-bold">
                        {summaryDetails.totalDayCareCharges}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  <tr>
                    <td colSpan={3} className=" font-bold">
                      Sub Total
                    </td>

                    <td className="font-bold">{summaryDetails.sum}</td>
                  </tr>
                </tbody>
              </table>
              <div className="final flex">
                <div className="left flex-grow">
                  <h6 className="font-bold my-2">Description:</h6>
                  <p className="text-sm">
                    Boarding for{" "}
                    <span className="font-bold">{billingDetails.pet_name}</span>
                  </p>
                  <h6 className="font-bold pt-4 my-2">
                    Invoice Amount in Words:
                  </h6>
                  <p className="text-sm">{totalInWords}</p>
                  <h6 className="font-bold pt-4 my-2">Pay To:</h6>
                  <p className="text-sm">
                    Account Holder's Name: Anita Sunder Shetty{" "}
                  </p>
                  <p className="text-sm">
                    Bank Name: HDFC Bank, Pune - LAW COLLEGE ROAD
                  </p>
                  <p className="text-sm">Bank Account No.: 00071050248628</p>
                  <p className="text-sm">Bank IFSC: HDFC0000007</p>
                  <div className="flex justify-start items-center gap-4">
                    <span>Verified By: Happiness Inspector</span>
                    <img
                      src="/happiness-inspector.png"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <table className="table table-sm h-min w-2/5">
                  <tbody>
                    <tr>
                      <td className=" ">Sub Total</td>
                      <td>{summaryDetails.sum}</td>
                    </tr>
                    {summaryDetails.discountPercentage != 0 ? (
                      <tr>
                        <td className=" ">Discount in %</td>
                        <td>{summaryDetails.discountPercentage}</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                    <tr className="bg-[#42a6c6] text-white">
                      <td className=" font-bold">Total Payable Amount </td>
                      <td className=" font-bold">
                        {summaryDetails.totalAmount}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="px-0">
                        <img
                          con
                          src="/tpdPaymentQR.svg"
                          height={250}
                          width={250}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePdf;
