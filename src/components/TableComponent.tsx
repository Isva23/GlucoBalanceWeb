import React, { useEffect, useState } from 'react';
import {collection,getDocs} from 'firebase/firestore/lite';
import { db } from '../firebase/config';

interface User {
  id: number;
  name: string;
  email: string;
  accountType: string;
  isSelected: boolean;
}
const initialData: User[] = [
  { id: 1, name: "John Carter", email: "john@google.com", accountType: "Admin", isSelected: false },
  { id: 2, name: "Sophie Moore", email: "sophie@webflow.com", accountType: "User", isSelected: false },
  { id: 3, name: "Matt Cannon", email: "matt@facebook.com", accountType: "User", isSelected: false },
  { id: 4, name: "Graham Hills", email: "graham@twitter.com", accountType: "Admin", isSelected: false },
  { id: 5, name: "Sandy Houston", email: "sandy@youtube.com", accountType: "User", isSelected: false },
  { id: 6, name: "Andy Smith", email: "andy@reddit.com", accountType: "Admin", isSelected: false },
  { id: 7, name: "Lily Woods", email: "lily@spotify.com", accountType: "User", isSelected: false },
  { id: 8, name: "Patrick Meyer", email: "patrick@pinterest.com", accountType: "Admin", isSelected: false },
  { id: 9, name: "Frances Wilton", email: "frances@twitch.com", accountType: "User", isSelected: false },
  { id: 10, name: "Ernest Houston", email: "ernest@linkedin.com", accountType: "Admin", isSelected: false },
];
const TableComponent: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  useEffect( ()=> {
    const usersRef = collection(db,'Users')
    getDocs(usersRef)
    .then((resp) =>
      console.log(
        resp.docs.map((doc) => {
          return {...doc.data() , id:doc.id}
        })
      ) 
    )
  },[])



  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / rowsPerPage) - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page
  };

  const toggleSelectUser = (id: number) => {
    setData(data.map(user => user.id === id ? { ...user, isSelected: !user.isSelected } : user));
  };

  const deleteSelectedUsers = () => {
    setData(data.filter(user => !user.isSelected));
  };

  const displayedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="container mx-auto">
        <table className="min-w-full divide-y divide-cerulean-blue-400">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-custom-card text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                <input type="checkbox" className="form-checkbox" />
              </th>
              {["Name", "Email", "Account Type", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 bg-custom-card text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-cerulean-blue-400">
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
                  <div className="text-sm font-medium text-white">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{user.accountType}</div>
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
        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="text-white mr-2">Columnas por pagina:</label>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="bg-cerulean-blue-700 px-4 py-2 rounded">
              {[5, 10, 25, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div>
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
            {currentPage * rowsPerPage + 1}-{Math.min((currentPage + 1) * rowsPerPage, data.length)} of {data.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
