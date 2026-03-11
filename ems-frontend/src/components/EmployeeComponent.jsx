import React, { useState } from 'react'

function EmployeeComponent() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  function saveEmployee(event){
    event.preventDefault();

    const employee = { firstName, lastName, email };

    console.log("Saving employee:", employee);
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
                 className='form-control'
                 value={firstName}
                 onChange={(event) => setFirstName(event.target.value)}
                 />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Last Name:</label>
                <input type='text'
                placeholder='Enter last name'
                 className='form-control'
                 value={lastName}
                 onChange={(event) => setLastName(event.target.value)} />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Email:</label>
                <input
                  type='email'
                  placeholder='Enter email'
                  className='form-control'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
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
