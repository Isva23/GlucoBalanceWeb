import React, { useEffect, useState } from 'react';
import {collection,onSnapshot,QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db, deleteDocument } from '../firebase/config';
import { Users } from '../types';
import StatCard from './StatCard';

const TableComponent: React.FC = () => {
  const [data,setData] = useState<Users[]>([])
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect(() => {
    const usersRef = collection(db, 'Users')
    // Escucha en tiempo real para la colección 'Users' con OnSnaoshot
    const unsubscribe = onSnapshot(usersRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const usersData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        accountType : Math.random() < 0.5 ? 'Premium' : 'Free'
      })) as Users[]
      setData(usersData)
    })

    // Cleanup: cancela la suscripción cuando el componente se desmonte
    return () => unsubscribe()
  }, [])



  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / rowsPerPage) - 1))
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0);
  }

  const toggleSelectUser = (id: string) => {
    setData(data.map(user => user.id === id ? { ...user, isSelected: !user.isSelected } : user))
  }

  const deleteSelectedUsers = () => {
    const selectedUsers = (data.filter(user => user.isSelected))    
    selectedUsers.forEach(users => deleteDocument('Users',users.id))
  }

  const displayedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
  const dataPremiumUsers = (data.filter(user => user.accountType === 'Premium'))
  const dataFreeUsers = (data.filter(user => user.accountType === 'Free'))

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 m-[60px]'>
        <StatCard
          title = {'Total de usuarios'}
          quantity={data.length}
          color='bg-cerulean-blue-400'
          textColor='text-cerulean-blue-200'
          icon='pi-address-book'
        />
        <StatCard
          title = {'Usuarios premium'}
          quantity={dataPremiumUsers.length}
          color='bg-yellow-500'
          textColor='text-yellow-500'
          icon='pi-star-fill'
        />
        <StatCard
          title = {'Usuarios free'}
          quantity={dataFreeUsers.length}
          color='bg-purple-500'
          textColor='text-purple-500'
          icon='pi-lock'
        />
        <button className='flex  border border-cerulean-blue-200 p-5 rounded-lg items-center text-center
        hover:bg-cerulean-blue-700'>
          <i className="pi pi-plus text-lg p-2"></i>
          <span className='text-lg font-semibold'>Agregar un nuevo administrador</span>
        </button>
      </div>

      <div className="bg-[#18181B] border border-[#1F1F22] p-5 m-[60px] rounded-xl">
        <h1 className="text-xl font-bold mb-10">Tabla usuarios</h1>
        <div className="flex items-center justify-center p-4">
          <div className="container mx-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-cerulean-blue-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-cerulean-blue-200 uppercase tracking-wider">
                      <input type="checkbox" className="form-checkbox" />
                    </th>
                    {["Nombre", "Email", "Tipo de cuenta", "Acción"].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-medium text-cerulean-blue-200 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-cerulean-blue-200">
                  {displayedData.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={user.isSelected}
                          onChange={() => toggleSelectUser(user.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{user.Nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{user.Correo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          <p className={`sm:w-1/2 w-full sm:px-0 px-2 text-center rounded-lg ${user.accountType === 'Premium' ? 'bg-cerulean-blue-500':'bg-cerulean-blue-300 text-black'}`}>
                            {user.accountType}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="rounded-lg hover:text-cerulean-blue-700"
                          onClick={() => deleteSelectedUsers()}
                        >
                          Eliminar
                          <i className="pi pi-trash ml-4" style={{ fontSize: '1rem' }}></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <div className="mb-4 sm:mb-0">
                <label className="text-white mr-2">Columnas por pagina:</label>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="bg-cerulean-blue-700 px-4 py-2 rounded">
                  {[5, 10, 25, 50].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4 sm:mb-0">
                <button
                  className="disabled:bg-cerulean-blue-950 rounded-lg px-4 py-2 disabled:text-cerulean-blue-700 bg-cerulean-blue-700 mr-5"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  <i className="pi pi-arrow-left" style={{ fontSize: '1rem' }}></i>
                </button>
                <button
                  className="disabled:bg-cerulean-blue-950 rounded-lg px-4 py-2 disabled:text-cerulean-blue-700 bg-cerulean-blue-700"
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(data.length / rowsPerPage) - 1}
                >
                  <i className="pi pi-arrow-right" style={{ fontSize: '1rem' }}></i>
                </button>
              </div>
              <div className="text-white">
                {currentPage * rowsPerPage + 1}-{Math.min((currentPage + 1) * rowsPerPage, data.length)} de {data.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default TableComponent;
