import { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../../employeeServices";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function useEmployeeUpdate(id) {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (id) => {
    try {
      const data = await getEmployeeById(id);
      setEmployee({
        ...data,
        salary: String(data.salary || ""),
      });
    } catch (error) {
      console.error("Error fetching employee:", error);
      toast.error("Failed to fetch employee data. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: name === "salary" ? String(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true); // Start the loading state
      try {
        await updateEmployee(id, employee);
        toast.success("Employee updated successfully!");
      } catch (error) {
        console.error("Error updating employee:", error);
        toast.error("Failed to update employee. Please try again.");
      } finally {
        // Wait for a few seconds before re-enabling the submit button
        setTimeout(() => {
          setIsSubmitting(false);
        }, 3000); // 3-second timeout to prevent rapid multiple submissions
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    // FirstName validation
    if (!employee.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (employee.firstName.length > 50) {
      errors.firstName = "First name cannot exceed 50 characters";
    }

    // LastName validation
    if (!employee.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (employee.lastName.length > 50) {
      errors.lastName = "Last name cannot exceed 50 characters";
    }

    // Email validation
    if (!employee.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      errors.email = "Email is invalid";
    } else if (employee.email.length > 100) {
      errors.email = "Email cannot exceed 100 characters";
    }

    // Position validation
    if (!employee.position.trim()) {
      errors.position = "Position is required";
    } else if (employee.position.length > 50) {
      errors.position = "Position cannot exceed 50 characters";
    }

    // Salary validation (ensure it's a valid number and within a reasonable range)
    const salary = employee.salary.trim();
    if (!salary) {
      errors.salary = "Salary is required";
    } else if (isNaN(salary) || parseFloat(salary) <= 0) {
      errors.salary = "Salary must be a valid positive number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    employee,
    formErrors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  };
}

export default useEmployeeUpdate;
