import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
} from "../../employeeServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
    setFilteredEmployees(filtered);
    setPage(1); // Reset to the first page when the filter changes
  }, [filter, employees]);

  const fetchEmployees = async () => {
    try {
      const employeesData = await getAllEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        await deleteEmployee(selectedEmployee.id);
        setEmployees(employees.filter((emp) => emp.id !== selectedEmployee.id));
        setShowDeleteModal(false);
        toast.success("Employee deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete employee. Please try again.");
        setShowDeleteModal(false);
      }
    }
  };

  const handleUpdate = async (updatedEmployee) => {
    if (updatedEmployee && updatedEmployee.id) {
      try {
        await updateEmployee(updatedEmployee);
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setShowUpdateModal(false);
        navigate(`/update/${updatedEmployee.id}`);
      } catch (error) {
        console.error("Error updating employee:", error);
        setShowUpdateModal(false);
      }
    }
  };

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
    navigate(`/update/${employee.id}`);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const getPaginatedEmployees = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredEmployees.slice(startIndex, endIndex);
  };

  const updateFilter = (event) => {
    setFilter(event.target.value);
  };

  const changePage = (newPage) => {
    setPage(newPage);
  };

  return {
    employees: getPaginatedEmployees(),
    handleDelete,
    openDeleteModal,
    openUpdateModal,
    selectedEmployee,
    setShowDeleteModal,
    setShowUpdateModal,
    showDeleteModal,
    showUpdateModal,
    handleUpdate,
    filter,
    updateFilter,
    page,
    pageSize,
    setPage,
    changePage,
    filteredEmployees,
  };
}

export default useEmployeeList;
