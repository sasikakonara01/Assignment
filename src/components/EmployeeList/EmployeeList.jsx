import React from "react";
import { Table, Button, Form, Pagination } from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import useEmployeeList from "./useEmployeeList";
import { ToastContainer } from "react-toastify";

const EmployeeList = () => {
  const {
    employees,
    handleDelete,
    openDeleteModal,
    openUpdateModal,
    selectedEmployee,
    setShowUpdateModal,
    setShowDeleteModal,
    showDeleteModal,
    showUpdateModal,
    handleUpdate,
    filter,
    updateFilter,
    page,
    pageSize,
    changePage,
    filteredEmployees,
  } = useEmployeeList();

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={updateFilter}
        className="mb-3"
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{`${emp.firstName} ${emp.lastName}`}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <Button variant="danger" onClick={() => openDeleteModal(emp)}>
                  Delete
                </Button>
                <Button
                  className="mx-2"
                  variant="warning"
                  onClick={() => openUpdateModal(emp)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => changePage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === page}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => changePage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>

      <ConfirmationModal
        show={showDeleteModal}
        action={"delete"}
        ButtonText={"Delete"}
        buttonColor={"danger"}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleDelete}
        employeeName={
          selectedEmployee
            ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
            : ""
        }
      />
      <ToastContainer />

      <ConfirmationModal
        show={showUpdateModal}
        action={"update"}
        buttonColor={"warning"}
        ButtonText={"Update"}
        handleClose={() => setShowUpdateModal(false)}
        handleConfirm={handleUpdate}
        employeeName={
          selectedEmployee
            ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}`
            : ""
        }
      />
    </>
  );
};

export default EmployeeList;
