import { useState } from "react"
import Home from "./components/Home"
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'


import { ListaDeFuncionesProops, User } from "./types"
import HeaderUI from "./components/UI/HeaderUI"
import { SingInDemo } from "./components/SingIn"


function App() {
  const [elementos,setElementos] = useState<ListaDeFuncionesProops[]>([])
  const [login,setLogin] = useState<boolean>(false)
  const [user,setUser] = useState<User>({ user: '', password: '' })

  const isLogin = login === true

  return (
    <>
    {!isLogin ?
      <>
        <HeaderUI
        setLogin = {setLogin}/>
        <section>
          <Home
            setElementos = {setElementos}
            elementos = {elementos}/>
        </section>
      
      </>
    :
      <div className="bg-gradient-to-b from-black to-gray-900 h-[60rem] pt-[40px]">
        <div className="mx-auto max-w-3xl">
          <div className="">
            <SingInDemo
              user = {user}
              setUser = {setUser}
            />
          </div>
        </div>
      </div>
    }
    </>
    )
}

export default App
