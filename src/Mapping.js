import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mapping() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    // Fetch employees, departments, and projects from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:27017/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:27017/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:27017/projects');
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
    fetchDepartments();
    fetchProjects();
  }, []);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedDepartments(selectedOptions);
  };

  const handleProjectChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedProjects(selectedOptions);
  };

  const handleMappingSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:27017/map/${selectedEmployee}`, {
        departments: selectedDepartments,
        projects: selectedProjects,
      });
      // Clear the selected options
      setSelectedEmployee('');
      setSelectedDepartments([]);
      setSelectedProjects([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Mapping</h2>
      <form onSubmit={handleMappingSubmit}>
        <label htmlFor="employee">Employee:</label>
        <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <label htmlFor="departments">Departments:</label>
        <select
          id="departments"
          multiple
          value={selectedDepartments}
          onChange={handleDepartmentChange}
        >
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>

        <label htmlFor="projects">Projects:</label>
        <select id="projects" multiple value={selectedProjects} onChange={handleProjectChange}>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        <button type="submit">Map</button>
      </form>
    </div>
  );
}

export default Mapping;