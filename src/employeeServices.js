import axios from "axios";

// Get the base API URL from the environment variable
const apiUrl = process.env.REACT_APP_API_BASE_URL;

console.log("API URL:", apiUrl);

// Fetch all employees
export const getAllEmployees = async () => {
  console.log("Fetching all employees...");
  try {
    const response = await axios.get(apiUrl, { withCredentials: true }); // Ensure credentials are included
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the employees:", error);
    throw error;
  }
};

// Fetch employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      withCredentials: true,
    }); // Ensure credentials are included
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

// Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(apiUrl, employeeData, {
      withCredentials: true,
    }); // Ensure credentials are included
    return response.data;
  } catch (error) {
    console.error("There was an error adding the employee:", error);
    throw error;
  }
};

// Update employee by ID
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, employeeData, {
      withCredentials: true,
    }); // Ensure credentials are included
    return response.data;
  } catch (error) {
    console.error(`There was an error updating employee with ID ${id}:`, error);
    throw error;
  }
};

// Delete employee by ID
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, {
      withCredentials: true,
    }); // Ensure credentials are included
    return response.data;
  } catch (error) {
    console.error(`There was an error deleting employee with ID ${id}:`, error);
    throw error;
  }
};
