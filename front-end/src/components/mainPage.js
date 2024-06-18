
import React, { useState,useEffect } from 'react';
import './mainPage.css'; // Import the CSS file for styling
import EmployeeListComponent from './employeeList.js';
import  CreateEmployeeComponent  from './createEmployee.js';
import LogoHeader from './logoHeader.js';
import { fetchEmployeesAPI } from '../api/api.js';
const MainPage = () => {
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [showFailFetchSnackbar,setShowFailFetchSnackbar] = useState(false);
    const fetchEmployees = async () => {
      try {

        const data = await fetchEmployeesAPI();

        setEmployees(data);
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error('Error fetching employees:', error);
        setShowFailFetchSnackbar(true);
        setTimeout(() => {
          setShowFailFetchSnackbar(false);
        }, 3000);
        setLoading(false); // Handle loading state on error
      }
    };
  
    // Fetch employees when component mounts
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    return (
      <div className="main-page">
      <LogoHeader/>
  
        <main>
          <nav className="navbar">
            <button onClick={() => {setShowAddEmployee(false);fetchEmployees()}}>View all employees</button>
            <button onClick={() => setShowAddEmployee(true)}>Add employee</button>
          </nav>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {showAddEmployee ? (
                <CreateEmployeeComponent onSuccess={() => fetchEmployees()}/>
              ) : (
                <EmployeeListComponent 
                employees={employees}
                onSuccess={fetchEmployees} // Pass fetchEmployees directly
                showFailFetchSnackbar={showFailFetchSnackbar}
                setShowFailFetchSnackbar={setShowFailFetchSnackbar}
                />
              )}
            </>
          )}
        </main>
      </div>
    );
  };
  
  export default MainPage;