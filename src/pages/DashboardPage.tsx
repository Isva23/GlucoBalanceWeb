import { useEffect, useState } from 'react'
import TableComponent from '../components/TableComponent';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';

type DashboardPageProops = {
  auth : boolean
}

export function DashboardPage ({auth}:DashboardPageProops) {
  const navigate = useNavigate()
  const [activeComponent, setActiveComponent] = useState<string>('usuarios')
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);



  useEffect(() => {
    if (auth === false) {
      navigate('/login')
    }
  }, [auth, navigate])

  const handleLinkClick = (component: string) => {
    setActiveComponent(component); // Establece el componente activo
  }
      return (
      <>
      <section className='md:flex'>
        <Sidebar
          activeComponent={activeComponent}
          handleLinkClick={handleLinkClick}
          isOpen = {isOpen}
          setIsOpen={setIsOpen}
          isOpenNav={isOpenNav}
          setIsOpenNav={setIsOpenNav}
        />
        <div className={`mx-auto md:w-full ${isOpenNav ? 'md:ml-[300px]' : 'md:ml-[50px]'} transition-left duration-300 ease-in-out`}>
          {activeComponent === 'usuarios' && <TableComponent />}
          {activeComponent === 'dashboard' && <>
          
          <div>
            <h1 className='text-6xl text-center mt-52'>coming soon</h1>
          </div>
          
          </>}
        </div>

      </section>

      </>

    )
  }
  
  export default DashboardPage