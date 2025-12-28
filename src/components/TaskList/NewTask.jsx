import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { showSuccessToast, showFailureToast } from '../../utils/toastConfig'
import BASE_URL from '../../utils/config'

const NewTask = ({ element, userData }) => {
  const [contextUserData, setContextUserData] = useContext(AuthContext)

  const handleAcceptTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tasks/${userData._id}/${element._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'active' })
      });

      if (response.ok) {
        const data = await response.json();

        // Update the specific user in the context array
        // Check if contextUserData is valid array before mapping
        if (Array.isArray(contextUserData)) {
          const updatedEmployees = contextUserData.map(emp =>
            emp._id === data.data._id ? data.data : emp
          );
          setContextUserData(updatedEmployees);
        }

        showSuccessToast('Task accepted successfully!');
      } else {
        showFailureToast('Failed to accept task');
      }
    } catch (error) {
      console.error("Error accepting task:", error);
      showFailureToast('Failed to accept task');
    }
  }

  return (
    <div className='flex-shrink-0 w-[300px] bg-[#252525] border-2 border-indigo-900 rounded-xl p-5 hover:shadow-md transition-all duration-200'>
      <div className='flex justify-between items-center'>
        <span className='px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-lg text-sm font-medium'>{element.category}</span>
        <span className='text-sm text-gray-400'>{element.taskDate}</span>
      </div>
      <h2 className='mt-4 text-lg font-semibold text-gray-100'>{element.taskTitle}</h2>
      <p className='mt-2 text-sm text-gray-300'>{element.taskDescription}</p>
      <div className='mt-5'>
        <button
          onClick={handleAcceptTask}
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200'
        >
          Accept Task
        </button>
      </div>
    </div>
  )
}

export default NewTask