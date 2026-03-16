import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'

function EmployeeComponent() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          const employee = response.data
          setFirstName(employee.firstName || '')
          setLastName(employee.lastName || '')
          setEmail(employee.email || '')
        })
        .catch((error) => {
          console.error('Error fetching employee:', error)
        })
    }
  }, [id])

  function saveEmployee(event){
    event.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      console.log(id ? "Updating employee:" : "Saving employee:", employee);

      const request = id
        ? updateEmployee(id, employee)
        : createEmployee(employee)

      request
        .then((response) => {
          console.log('Employee saved:', response.data)
          navigate('/employees')
        })
        .catch((error) => {
          console.error('Error saving employee:', error)
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
          <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>
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

              <div className='d-flex justify-content-between'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => navigate('/employees')}
                >
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary' onClick={saveEmployee}>
                  {id ? 'Update Employee' : 'Save Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default EmployeeComponent
