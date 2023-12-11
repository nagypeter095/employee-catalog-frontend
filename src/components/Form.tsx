import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import axios from "axios";

interface FormData {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  gender: string;
  age: number;
}

interface FormProps {
  addingNewEmployee: boolean;
  defaultValues?: FormData;
}

const Form = ({ addingNewEmployee, defaultValues }: FormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: defaultValues?.firstName,
      lastName: defaultValues?.lastName,
      position: defaultValues?.position,
      gender: defaultValues?.gender,
      age: defaultValues?.age,
    },
  });

  const onSubmit = (data: FieldValues) => {
    if (addingNewEmployee) {
      axios
        .post("https://employee-api.azure-api.net/api/Employees", data)
        .then(() => navigate("/"));
    } else {
      axios
        .put(
          `https://employee-api.azure-api.net/api/Employees/${defaultValues?.id}`,
          { ...data, id: defaultValues?.id }
        )
        .then(() => navigate("/"));
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-4">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          {...register("firstName", { required: true })}
          id="title"
          type="text"
          className="form-control"
        />
        {errors.firstName?.type === "required" && (
          <p className="text-danger">
            First name must contain at least 1 character.
          </p>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          {...register("lastName", { required: true })}
          id="title"
          type="text"
          className="form-control"
        />
        {errors.lastName?.type === "required" && (
          <p className="text-danger">
            Last name must contain at least 1 character.
          </p>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="position" className="form-label">
          Position
        </label>
        <select
          {...register("position", { required: true })}
          id="position"
          className="form-select"
        >
          <option value="Frontend developer">Frontend Developer</option>
          <option value="Backend developer">Backend developer</option>
          <option value="Fullstack developer">Fullstack developer</option>
          <option value="Cloud architect">Cloud architect</option>
          <option value="Data engineer">Data engineer</option>
        </select>
      </div>

      <div className="col-md-4">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          {...register("gender", { required: true })}
          id="gender"
          className="form-select"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="col-md-4">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { required: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age?.type === "required" && (
          <p className="text-danger">Age is required.</p>
        )}
      </div>

      <div className="text-end mt-5">
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline-light m-2"
          type="button"
        >
          Back
        </button>
        <button className="btn btn-primary" type="submit">
          {addingNewEmployee ? "Add employee" : "Update"}
        </button>
      </div>
    </form>
  );
};

export default Form;
