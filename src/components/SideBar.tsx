interface Props {
  activeComponent: string
  handleLinkClick: (component: string) => void
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpenNav : boolean
  setIsOpenNav: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<Props> = ({ activeComponent, handleLinkClick, isOpen,setIsOpen,isOpenNav,setIsOpenNav}) => {


  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }
  const toggleSidebarDesktop = () => {
    setIsOpenNav(!isOpenNav);
  }


  return (
    <>
    <div className="sm:hidden fixed top-4 left-4">
      <button className="text-white bg-cerulean-blue-700 p-2 rounded-lg" onClick={toggleSidebar}>
        <span className="pi pi-bars" style={{ fontSize: '1.5rem' }}></span>
      </button>
    </div>

    <div className={`h-screen shadow-lg shadow-black bg-[#0E0E11] fixed ${isOpen ? 'left-0' : '-left-full'} 
    sm:left-0 top-0 sm:max-w-[270px] w-full max-w-[270px]  transition-left duration-300 ease-in-out
    ${isOpenNav ? 'max-w-[270px] transition-right duration-500 ease-in-out' : 'w-[68px]'}
    `}>
      <div className="p-5 mb-10 mt-10 flex justify-between items-center">
        {isOpenNav ? <h1 className='gradient-text text-2xl'>GlucoBalance</h1> 
        :<img src="/logo.png" className="w-[28px] h-[28px]"/>}
        
        <button className="text-white sm:hidden" onClick={toggleSidebar}>
          <span className="pi pi-times" style={{ fontSize: '1.5rem' }}></span>
        </button>
      </div>

      <div className={`flex flex-col p-3 space-y-2 items-center`}>
        <a className={`cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1 active:bg-cerulean-blue-600
          ${activeComponent === 'dashboard' ? 'bg-cerulean-blue-700' : ''}`}
          onClick={() => handleLinkClick('dashboard')}>
          <span className='pi pi-home p-2'></span>
          <span className={`text-lg font-medium ${isOpenNav ? '' : 'hidden'}`}>Dashboard</span>
        </a>

        <a className={`cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1 active:bg-cerulean-blue-600
          ${activeComponent === 'usuarios' ? 'bg-cerulean-blue-700' : ''}`}
          onClick={() => handleLinkClick('usuarios')}>
          <span className="pi pi-users p-2"></span>
          <span className={`text-lg font-medium ${isOpenNav ? '' : 'hidden'}`}>Usuarios</span>
        </a>

        <a href="" className="cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1">
          <span className="pi pi-sign-out p-2"></span>
          <span className={`text-lg font-medium ${isOpenNav ? '' : 'hidden'}`}>Cerrar sesión</span>
        </a>
      </div>
      <a onClick={toggleSidebarDesktop} className="cursor-pointer space-y-10 items-center">
            {isOpenNav ? <span className="pi pi-chevron-left p-2 m-[20px] float-end "></span> : 
            <span className="pi pi-chevron-right float-end mr-[28px] mt-[20px]"></span>}
      </a>
    </div>
  </>   
  )
}

export default Sidebar;
