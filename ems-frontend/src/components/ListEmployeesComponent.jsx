import React, {useState, useEffect} from 'react'
import { listEmployees, deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeesComponent = () =>{

   const [employees, setEmployees] = useState([])
   const [showDeleteModal, setShowDeleteModal] = useState(false)
   const [employeeToDelete, setEmployeeToDelete] = useState(null)

   const navigate = useNavigate()

   useEffect(() => {
    listEmployees().then((response) => {
        setEmployees(response.data)
    }).catch((error) => {
        console.log(error)
    })
   }, [])

   function addNewEmployee() {
    navigate('/add-employee')
   }

   function updateEmployee(id) {
    navigate(`/edit-employee/${id}`)
   }

   function confirmDeleteEmployee(employee) {
    setEmployeeToDelete(employee)
    setShowDeleteModal(true)
   }

   function closeDeleteModal() {
    setShowDeleteModal(false)
    setEmployeeToDelete(null)
   }

   function removeEmployee(id) {
    deleteEmployee(id)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        )
        closeDeleteModal()
      })
      .catch((error) => {
        console.error('Error deleting employee:', error)
      })
   }

  return (
    <div className='container'>

        <h2 className='text-center'>List of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button
                                    className='btn btn-info me-2'
                                    onClick={() => updateEmployee(employee.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => confirmDeleteEmployee(employee)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        {showDeleteModal && (
          <div className='modal fade show' style={{ display: 'block' }}>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Confirmar exclusão</h5>
                  <button type='button' className='btn-close' onClick={closeDeleteModal}></button>
                </div>
                <div className='modal-body'>
                  <p>
                    Tem certeza que deseja deletar o funcionário{' '}
                    <strong>
                      {employeeToDelete?.firstName} {employeeToDelete?.lastName}
                    </strong>
                    ?
                  </p>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' onClick={closeDeleteModal}>
                    Cancelar
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => removeEmployee(employeeToDelete.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  )
}

export default ListEmployeesComponent