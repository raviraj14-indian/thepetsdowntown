import { useEffect } from "react";

const OrderSummary = ({
  billingDetails,
  summaryDetails,
  setSummaryDetails,
}) => {
  useEffect(() => {}, [summaryDetails]);

  const handleInputChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, "");

    const value = e.target.value ? parseInt(e.target.value) : 0;
    if (e.target.name == "boardingChargesPerDay") {
      const Sum =
        billingDetails.bordingDays * value + summaryDetails.totalDayCareCharges;
      setSummaryDetails({
        ...summaryDetails,
        boardingChargesPerDay: value,
        totalBoardingCharges: billingDetails.bordingDays * value,
        sum: Sum,
        totalAmount: Math.floor(
          Sum - (Sum * summaryDetails.discountPercentage) / 100
        ),
      });
    }
    if (e.target.name == "totalDayCareCharges") {
      const Sum = value + summaryDetails.totalBoardingCharges;
      setSummaryDetails({
        ...summaryDetails,
        totalDayCareCharges: value,
        sum: summaryDetails.totalBoardingCharges + value,
        totalAmount: Math.floor(
          Sum - (Sum * summaryDetails.discountPercentage) / 100
        ),
      });
    }
    if (e.target.name == "discountPercentage") {
      setSummaryDetails({
        ...summaryDetails,
        discountPercentage: value,
        totalAmount: Math.floor(
          summaryDetails.sum - (summaryDetails.sum * value) / 100
        ),
      });
    }
  };
  return (
    <>
      <table className="table bg-base-300">
        <thead>
          <tr>
            <th>Job</th>
            <th>Qty</th>
            <th></th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className=" font-bold">Boarding</td>
            <td>{billingDetails.bordingDays} days</td>
            <td>
              <input
                onChange={handleInputChange}
                required
                name="boardingChargesPerDay"
                type="text"
                inputmode="numeric"
                placeholder="₹ per day"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
            <td>
              <input
                onChange={handleInputChange}
                required
                name="totalBoardingCharges"
                value={summaryDetails.totalBoardingCharges}
                readOnly
                type="number"
                placeholder="₹₹₹"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
          </tr>
          <tr>
            <td className=" font-bold">Day Care</td>
            <td colSpan={2}>
              {billingDetails.dayCareHours} hrs, {billingDetails.dayCareMins}{" "}
              mins
            </td>
            <td>
              <input
                onChange={handleInputChange}
                required
                name="totalDayCareCharges"
                type="text"
                inputmode="numeric"
                placeholder="₹₹₹"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
          </tr>
          <tr>
            <td className=" font-bold">Sub Total</td>
            <td></td>
            <td></td>
            <td>
              <input
                onChange={handleInputChange}
                name="sum"
                value={summaryDetails.sum}
                required
                readOnly
                type="number"
                placeholder="₹₹₹"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} className=" font-bold">
              Discount in %
            </td>
            <td></td>
            <td>
              <input
                onChange={handleInputChange}
                name="discountPercentage"
                required
                value={summaryDetails.discountPercentage}
                type="text"
                inputmode="numeric"
                placeholder="₹₹₹"
                min="0"
                max="50"
                className="input input-bordered w-full max-w-xs"
              />
            </td>
          </tr>
          <tr>
            <td className="p-0" colSpan={4}>
              <div className="divider"></div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className=" font-bold">
              Total Payable Amount{" "}
            </td>
            <td>
              <input
                onChange={handleInputChange}
                required
                value={summaryDetails.totalAmount}
                name="totalAmount"
                type="number"
                placeholder="₹₹₹"
                className="input input-bordered font-bold w-full max-w-xs"
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderSummary;
// import { useEffect } from "react";

// const OrderSummary = ({
//   billingDetails,
//   summaryDetails,
//   setSummaryDetails,
// }) => {
//   useEffect(() => {}, [summaryDetails]);

//   const handleInputChange = (e) => {
//     const value = e.target.value ? parseInt(e.target.value) : 0;
//     if (e.target.name == "boardingChargesPerDay") {
//       const Sum =
//         billingDetails.bordingDays * value + summaryDetails.totalDayCareCharges;
//       setSummaryDetails({
//         ...summaryDetails,
//         boardingChargesPerDay: value,
//         totalBoardingCharges: billingDetails.bordingDays * value,
//         sum: Sum,
//         totalAmount: Sum - (Sum * summaryDetails.discountPercentage) / 100,
//       });
//     }
//     if (e.target.name == "totalDayCareCharges") {
//       const Sum = value + summaryDetails.totalBoardingCharges;
//       setSummaryDetails({
//         ...summaryDetails,
//         totalDayCareCharges: value,
//         sum: summaryDetails.totalBoardingCharges + value,
//         totalAmount: Sum - (Sum * summaryDetails.discountPercentage) / 100,
//       });
//     }
//     if (e.target.name == "discountPercentage") {
//       setSummaryDetails({
//         ...summaryDetails,
//         discountPercentage: value,
//         totalAmount: summaryDetails.sum - (summaryDetails.sum * value) / 100,
//       });
//     }
//   };
//   return (
//     <>
//       {/* <div className="overflow-x-auto"> */}

//       <table className="table bg-base-300">
//         {/* head */}
//         <thead>
//           <tr>
//             <th>Job</th>
//             <th>Qty</th>
//             <th></th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* row 1 */}
//           <tr>
//             <td className=" font-bold">Boarding</td>
//             <td>{billingDetails.bordingDays} days</td>
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 required
//                 name="boardingChargesPerDay"
//                 type="number"
//                 placeholder="₹ per day"
//                 className="input input-bordered w-full max-w-xs"
//               />
//             </td>
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 required
//                 name="totalBoardingCharges"
//                 value={summaryDetails.totalBoardingCharges}
//                 readOnly
//                 type="number"
//                 placeholder="₹₹₹"
//                 className="input input-bordered  w-full max-w-xs"
//               />
//             </td>
//           </tr>
//           {/* row 2 */}
//           <tr>
//             <td className=" font-bold">Day Care</td>
//             <td colSpan={2}>
//               {billingDetails.dayCareHours} hrs, {billingDetails.dayCareMins}{" "}
//               mins
//             </td>
//             {/* <td></td> */}
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 required
//                 name="totalDayCareCharges"
//                 type="number"
//                 placeholder="₹₹₹"
//                 className="input input-bordered     w-full max-w-xs"
//               />
//             </td>
//           </tr>
//           {/* row 3 */}
//           <tr>
//             <td className=" font-bold">Sum</td>
//             <td></td>
//             <td></td>
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 name="sum"
//                 // value={summaryDetails.totalAmount}
//                 value={summaryDetails.sum}
//                 required
//                 readOnly
//                 type="number"
//                 placeholder="₹₹₹"
//                 className="input input-bordered     w-full max-w-xs"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td colSpan={2} className=" font-bold">
//               Discount in %
//             </td>
//             <td></td>
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 name="discountPercentage"
//                 required
//                 value={summaryDetails.discountPercentage}
//                 type="number"
//                 placeholder="₹₹₹"
//                 min="0"
//                 max="50"
//                 className="input input-bordered     w-full max-w-xs"
//               />
//             </td>
//           </tr>
//           <tr>
//             <td className="p-0" colSpan={4}>
//               <div className="divider"></div>
//             </td>
//           </tr>
//           <tr>
//             <td colSpan={3} className=" font-bold">
//               Total Payable Amount{" "}
//             </td>
//             <td>
//               <input
//                 onChange={handleInputChange}
//                 required
//                 value={summaryDetails.totalAmount}
//                 name="totalAmount"
//                 type="number"
//                 placeholder="₹₹₹"
//                 className="input input-bordered font-bold w-full max-w-xs"
//                 readOnly
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       {/* </div> */}
//     </>
//   );
// };

// export default OrderSummary;
