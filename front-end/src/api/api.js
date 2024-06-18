const BASE_URL = 'http://localhost:3000';

export const fetchEmployeesAPI = async () => {
  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};


export const login = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      localStorage.setItem('jwtToken', data.token);
  
      return data; // Return data if needed in the component
    } catch (error) {
      throw new Error('Invalid username or password. Please try again.'); // Throw error for component handling
    }
  };

  export async function addEmployee(employeeData) {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      },
      body: employeeData,
    });
  
    return response;
  }


export async function deleteEmployee(employeeId) {
    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        'Content-Type': 'application/json'
      },
    });
  
    return response;
  }