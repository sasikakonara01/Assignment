import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import UpdateEmployee from "./components/EmployeeUpdate/EmployeeUpdate";
// import ViewEmployee from "./components/ViewEmployee";

function Routers() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} />
          {/* <Route path="/view/:id" element={<ViewEmployee />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default Routers;
