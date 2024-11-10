import React from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import useAddEmployee from "./useAddEmployee";
import { ToastContainer } from "react-toastify";

function AddEmployee() {
  const {
    formData,
    formErrors,
    handleInputChange,
    handleSubmit,
    isSubmitting,
  } = useAddEmployee();

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs="12" md="6">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
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
                value={formData.lastName}
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
            value={formData.email}
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
            value={formData.position}
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
            value={formData.salary}
            onChange={handleInputChange}
            isInvalid={!!formErrors.salary}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.salary}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          className="mt-3"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner animation="border" size="sm" /> : "Submit"}
        </Button>
      </Form>

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
}

export default AddEmployee;
