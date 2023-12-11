import { useEffect, useState } from "react";
import Table from "../components/Table";
import axios, { CanceledError } from "axios";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  gender: string;
  age: number;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get<Employee[]>("https://employee-api.azure-api.net/api/Employees", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setEmployees(data);
        setIsLoading(false);
        setError("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  const deleteEmployee = (id: number) => {
    const originalEmployees = [...employees];
    setEmployees(employees.filter((employee) => employee.id !== id));
    axios
      .delete(`https://employee-api.azure-api.net/api/Employees/${id}`)
      .catch((err) => {
        setError(err.message);
        setEmployees(originalEmployees);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h1>Employee catalog</h1>
          <p className="m-0">
            Testing CRUD operations with asp.net core web api
          </p>
        </div>
        <div className="d-flex align-items-end">
          <button
            onClick={() => navigate("/employee/add")}
            type="button"
            className="btn btn-primary"
          >
            Add new employee
          </button>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <Table employees={employees} onDelete={deleteEmployee} />
    </>
  );
};

export default MainPage;
