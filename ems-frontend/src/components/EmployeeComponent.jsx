import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../services/EmployeeService'

function EmployeeComponent() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  function saveEmployee(event){
    event.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      console.log("Saving employee:", employee);
  
      createEmployee(employee)
        .then((response) => {
          console.log('Employee created:', response.data)
          navigate('/employees')
        })
        .catch((error) => {
          console.error('Error creating employee:', error)
        })
    }
  }
  
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!firstName.trim()) {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    } else {
      errorsCopy.firstName = '';
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    } else {
      errorsCopy.lastName = '';
    }

    if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    setErrors(errorsCopy);
    return valid;
    
  }
  
  return (
    <div className='container'>
      <br />
      <div className='row'> 
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add Employee</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name:</label>
                <input type='text'
                placeholder='Enter first name'
                 className={`form-control${errors.firstName ? ' is-invalid' : ''}`}
                 value={firstName}
                 onChange={(event) => setFirstName(event.target.value)}
                 />
                 {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter last name'
                  className={`form-control${errors.lastName ? ' is-invalid' : ''}`}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  className={`form-control${errors.email ? ' is-invalid' : ''}`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <button type='submit' className='btn btn-primary' onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default EmployeeComponent
