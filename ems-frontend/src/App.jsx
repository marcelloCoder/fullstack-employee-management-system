import './App.css'
import HelloWorld from './HelloWorld'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import ListEmployeesComponent from './components/ListEmployeesComponent'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
 
  return (
    <>
    <Router>
      <HeaderComponent />
      <Routes>
       { /*// localhost:3000 */}
        <Route path='/' element={<ListEmployeesComponent />} />
        {/*/ localhost:3000/employees */}
        <Route path='/employees' element={<ListEmployeesComponent />} />
      </Routes>
      <FooterComponent />
    </Router>
    </>
  )
}

export default App
