import React from 'react'
import Room from './pages/Room'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import RegisterPage from './pages/RegisterPage'
const App = () => {
  return (
     <Router>
      <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

        <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Room/>}/>
        </Route>
        
        

      </Routes>
      </AuthProvider>
     </Router>
   
  )
}

export default App