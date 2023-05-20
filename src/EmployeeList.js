import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch the mapped employees from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {employees.map((employee) => (
        <div key={employee._id}>
          <h3>{employee.name}</h3>
          <p>Departments:</p>
          <ul>
            {employee.departments.map((department) => (
              <li key={department._id}>{department.name}</li>
            ))}
          </ul>
          <p>Projects:</p>
          <ul>
            {employee.projects.map((project) => (
              <li key={project._id}>{project.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;