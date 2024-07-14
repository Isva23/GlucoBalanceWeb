import { useState } from "react"
import Home from "./components/Home"
import 'primereact/resources/themes/md-dark-indigo/theme.css'
import 'primereact/resources/primereact.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ListaDeFuncionesProops, User } from "./types"
import { SingInDemo } from "./components/SingIn"
import DashboardPage from "./pages/DashboardPage";


function App() {
  const [elementos,setElementos] = useState<ListaDeFuncionesProops[]>([])
  const [user,setUser] = useState<User>({ user: '', password: '' })
  const [auth,setAuth] = useState<boolean>(false)
  const isAuth = auth === true
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={
            <Home
              setElementos = {setElementos}
              elementos = {elementos}/>
          }/>
          <Route path="/login" element={
            <SingInDemo 
              setAuth = {setAuth}
              user={user}
              setUser={setUser}
            />
          } />
          <Route path="/dashboard" element={<DashboardPage />} />
          {isAuth ? 
          <Route path="*" element={<Navigate to="/dashboard" />} />
          :
          <Route path="*" element={<Navigate to="/home" />} />
          }
        </Routes>
      </Router>
      
    </>
  ) 
}

export default App
