import { useState } from "react";
import { toast } from "react-toastify";
import { addEmployee } from "../../employeeServices";
import "react-toastify/dist/ReactToastify.css";

function useAddEmployee() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName || formData.firstName.length > 50) {
      errors.firstName =
        "First Name is required and should be less than 50 characters.";
      isValid = false;
    }

    if (!formData.lastName || formData.lastName.length > 50) {
      errors.lastName =
        "Last Name is required and should be less than 50 characters.";
      isValid = false;
    }

    if (!formData.email || formData.email.length > 100) {
      errors.email =
        "Email is required and should be less than 100 characters.";
      isValid = false;
    }

    if (!formData.position || formData.position.length > 50) {
      errors.position =
        "Position is required and should be less than 50 characters.";
      isValid = false;
    }

    if (!formData.salary || isNaN(formData.salary)) {
      errors.salary = "Salary is required and must be a valid number.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await addEmployee(formData);
        toast.success("Employee added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          position: "",
          salary: "",
        });
      } catch (error) {
        toast.error("Failed to submit form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
    validateForm,
    isSubmitting,
  };
}

export default useAddEmployee;
