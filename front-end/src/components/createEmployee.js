import React, { useState } from 'react';
import './createEmployee.css'; // Import the CSS file for styling
import { addEmployee } from '../api/api';
const CreateEmployeeComponent = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showFailSnackbar, setShowFailSnackbar] = useState(false);

  function validateName(name) {
    // Regular expression to allow only alphabets and check minimum length of 3
    const nameRegex = /^[a-zA-Z-]{3,}$/;
    return nameRegex.test(name);
  }

  function validateDateOfBirth(dateOfBirth) {
    // Calculate minimum birth date allowed (18 years ago from today)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);

    const dob = new Date(dateOfBirth);
  
    return dob <= minDate;
  }
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setCity('');
    setCountry('');
    setBirthDate('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (!validateName(firstName) || !validateName(lastName)) {
            setError('First name and last name must be at least 3 characters long and must not contain symbols.');
            return;
        }

        if (!validateDateOfBirth(birthDate)) {
            setError('Date of birth must be at least 18 years ago.');
            return;
        }
        setError('');
      const employeeData= JSON.stringify({
        firstName: firstName.toLowerCase(), // Convert to lowercase
        lastName: lastName.toLowerCase(), // Convert to lowercase
        birthDate,
        country: country.toLowerCase(), // Convert to lowercase
        city: city.toLowerCase(),
    });
      const response = await addEmployee(employeeData);

      if (!response.ok) {
        throw new Error('Failed to add employee');
        
      }
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        setShowSuccessSnackbar(false);
      }, 3000);

      props.onSuccess();

      resetFields();

    } catch (error) {
        setShowFailSnackbar(true);
        setTimeout(() => {
          setShowFailSnackbar(false);
        }, 3000);
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <button type="submit">Add employee</button>
        </div>
      </form>
      <div className={`snackbar success ${showSuccessSnackbar ? 'show' : 'hide'}`}>
        <p>Employee added successfully!</p>
      </div>

      <div className={`snackbar fail ${showFailSnackbar ? 'show' : 'hide'}`}>
        <p>Failed to add Employee. Please try again.</p>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;