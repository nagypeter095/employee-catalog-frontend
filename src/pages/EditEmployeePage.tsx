import { useLocation } from "react-router-dom";
import Form from "../components/Form";

const EditEmployeePage = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <>
      <h1 className="mb-3">Edit employee data</h1>
      <Form addingNewEmployee={false} defaultValues={data} />
    </>
  );
};

export default EditEmployeePage;
