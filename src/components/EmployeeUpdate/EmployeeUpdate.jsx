import React from "react";
import { useParams } from "react-router-dom";
import useEmployeeUpdate from "./useEmployeeUpdate";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

function EmployeeUpdate() {
  const { id } = useParams();
  const {
    employee,
    formErrors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  } = useEmployeeUpdate(id);

  return (
    <>
      <div>
        {/* Check if all fields in `employee` are empty */}
        {employee && Object.values(employee).every((value) => value === "") ? (
          <div className="alert alert-danger" role="alert">
            This Employee Id is Not Found, Please check it out!
          </div>
        ) : null}
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" md="6">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={employee.firstName || ""}
                onChange={handleInputChange}
                maxLength="50"
                isInvalid={!!formErrors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="12" md="6">
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={employee.lastName || ""}
                onChange={handleInputChange}
                maxLength="50"
                isInvalid={!!formErrors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={employee.email || ""}
            onChange={handleInputChange}
            maxLength="100"
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={employee.position || ""}
            onChange={handleInputChange}
            maxLength="50"
            isInvalid={!!formErrors.position}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.position}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSalary">
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            value={employee.salary || ""}
            onChange={handleInputChange}
            isInvalid={!!formErrors.salary}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.salary}
          </Form.Control.Feedback>
        </Form.Group>

        <ToastContainer />
        <Button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isSubmitting} // Disable the button while submitting
        >
          {isSubmitting ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>
    </>
  );
}

export default EmployeeUpdate;
