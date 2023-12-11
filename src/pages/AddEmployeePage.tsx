import Form from "../components/Form";

const AddEmployeePage = () => {
  return (
    <>
      <h1 className="mb-3">Add a new employee</h1>
      <Form addingNewEmployee={true} />
    </>
  );
};

export default AddEmployeePage;
