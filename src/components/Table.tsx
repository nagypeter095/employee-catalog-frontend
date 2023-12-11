import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  gender: string;
  age: number;
}

interface TableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

const Table = ({ employees, onDelete }: TableProps) => {
  const navigate = useNavigate();

  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Position</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.position}</td>
            <td>{employee.age}</td>
            <td>{employee.gender}</td>
            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() =>
                    navigate("/employee/edit", { state: employee })
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
