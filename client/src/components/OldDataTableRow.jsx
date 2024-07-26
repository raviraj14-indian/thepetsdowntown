import DatePicker from "react-datepicker";
import {
  setHours,
  setMinutes,
  subDays,
} from "react-datepicker/dist/date_utils.d.ts";

const OldDataTableRow = ({ rowData, index }) => {
  //   const [isButtonLoading, setIsButtonLoading] = useState(false);
  //   const [endDate, setEndDate] = useState();
  //   const [errors, setErrors] = useState();

  return (
    <>
      <tr className="hover">
        <td>{index}</td>
        <td>{rowData.client_name}</td>
        {/* <td>{   rowData.pet_name}</td> */}
        <td>{rowData.pet_name ? rowData.pet_name : "-"}</td>
        <td>{rowData.date}</td>
        <td>{rowData.amount}</td>
      </tr>
    </>
  );
};

export default OldDataTableRow;
