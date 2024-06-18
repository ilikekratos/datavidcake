import React, { useState,useEffect } from 'react';
import './employeeList.css'; // Import the CSS file for styling
import { ReactComponent as BirthDayCake } from '../assets/cake.svg';
import { deleteEmployee } from '../api/api';
const EmployeeListComponent = ({ employees, onSuccess, showFailFetchSnackbar, setShowFailFetchSnackbar }) => {
  const [sortCriteria, setSortCriteria] = useState('lastName'); // Default sort by last name
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showFailSnackbar, setShowFailSnackbar] = useState(false);

  useEffect(() => {
    if (showFailFetchSnackbar) {
      setShowFailFetchSnackbar(true);
      setTimeout(() => {
        setShowFailFetchSnackbar(false); 
      }, 3000);
    }
  }, [showFailFetchSnackbar, setShowFailFetchSnackbar]);

  const handleDelete = async (employeeId) => {
    try {
      const response = await deleteEmployee(employeeId);

      if (!response.ok) {
        setShowFailSnackbar(true);
        setTimeout(() => {
          setShowFailSnackbar(false);
        }, 3000);
        throw new Error('Failed to delete employee');
      }
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        setShowSuccessSnackbar(false);
      }, 3000);

      onSuccess();
    } catch (error) {
        setShowFailSnackbar(true);
        setTimeout(() => {
          setShowFailSnackbar(false);
        }, 3000);
      console.error('Error deleting employee:', error);
    }
  };

  function daysUntilBirthday(birthDate) {
    const today = new Date();
    const nextBirthDate = new Date(birthDate);
    if(isBirthdayToday(nextBirthDate)){
      return 0;
    }
    nextBirthDate.setFullYear(today.getFullYear());
    if (today > nextBirthDate) {
        nextBirthDate.setFullYear(today.getFullYear() + 1);
    }
    const diff = nextBirthDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
  
  const sortEmployees = (employees) => {
    return employees.slice().sort((a, b) => {
      if (sortCriteria === 'lastName') {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortCriteria === 'birthDate') {
        const daysUntil1 = daysUntilBirthday(a.birthDate);
        const daysUntil2 = daysUntilBirthday(b.birthDate);
        return daysUntil1 - daysUntil2;
      }
      return 0;
    });
  };
  const isBirthdayToday = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    return birth.getMonth() === today.getMonth() && birth.getDate() === today.getDate();
  };

  return (
    <div className="employee-list-container">
      <h2>DataVid employees</h2>
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="lastName">Last Name</option>
          <option value="birthDate">Closest Birth Date</option>
        </select>
      </div>
      <div>
      <ul className="list-container">
        {sortEmployees(employees).map((employee) => (
          <li key={employee.id} className="employee-item">
            <div className="employee-details-container">
                <span className="employee-name">{employee.firstName} {employee.lastName}</span>
                <span className="employee-details">{employee.city}, {employee.country}</span>
                <span className="employee-details">{new Date(employee.birthDate).toLocaleDateString()}</span>

            </div>
            <div className='cake-container'>
                    {isBirthdayToday(employee.birthDate) && <BirthDayCake className="birthday-icon" />}
                </div>
            <button onClick={() => handleDelete(employee.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
      </div>
      <div className={`snackbar success ${showSuccessSnackbar ? 'show' : 'hide'}`}>
        <p>Deleted employee successfully!</p>
      </div>

      <div className={`snackbar fail ${showFailSnackbar ? 'show' : 'hide'}`}>
        <p>Failed to delete employee. Please try again.</p>
      </div>

      <div className={`snackbar fail ${showFailFetchSnackbar ? 'show' : 'hide'}`}>
        <p>Failed to fetch employees</p>
      </div>
    </div>
    
  );
};

export default EmployeeListComponent;