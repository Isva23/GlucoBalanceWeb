import React from 'react'
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableComponent from '../components/TableComponent';

const DashboardPage: React.FC = () => {
  const handleOnclick = () => {

  }
      return (
      <>
      <section className='flex'>
        <div className='h-screen max-w-[270px] w-full shadow-lg shadow-black' >
          
          <div className='p-5 mb-10'>
            <h1 className='gradient-text text-2xl'>GlucoBalance</h1>
          </div>
      
          <div className='flex grid-flow-col p-3 space-x-2 items-center' id='dashboard'>
            <a href=""  className='cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1'>
              <span className="pi pi-users p-2 mr-3"></span>
              <span className='text-lg font-medium'>Dahboard</span>
            </a>
          </div>

          <div className='flex grid-flow-col p-3 space-x-2 items-center' id='dashboard'>
            <a href=""  className='cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1'>
              <span className="pi pi-users p-2 mr-3"></span>
              <span className='text-lg font-medium'>Dahboard</span>
            </a>
          </div>

          <div className='flex grid-flow-col p-3 space-x-2 items-center' id='dashboard'>
            <a href=""  className='cursor-pointer hover:bg-[#1d49d8] w-full rounded-xl p-1'>
              <span className="pi pi-users p-2 mr-3"></span>
              <span className='text-lg font-medium'>Dahboard</span>
            </a>
          </div>

        </div>

        <div className='mx-auto w-full'>
          <div className='bg-[#18181B] border border-[#1F1F22] p-5 m-[60px] rounded-xl'>
            <h1 className='text-lg font-bold'>Tabla usuarios</h1>
            <TableComponent/>
            
          </div>
        </div>

      </section>
    
      </>
    )
  }
  
  export default DashboardPage