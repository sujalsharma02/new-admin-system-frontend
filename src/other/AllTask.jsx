import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import BASE_URL from '../utils/config'

const AllTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const [selectedUser, setSelectedUser] = React.useState(null)

    if (!userData) {
        return <div className='text-white p-6'>Loading...</div>
    }

    const handleDelete = async (userId, taskId) => {
        try {
            const response = await fetch(`${BASE_URL}/api/tasks/${userId}/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const data = await response.json();
                // Update local state
                const newUserData = userData.map(user => {
                    if (user._id === userId) {
                        return data.data; // Replace with updated user from backend
                    }
                    return user;
                });
                setUserData(newUserData);

                // Update selected user to reflect changes in modal
                setSelectedUser(data.data);
            } else {
                alert('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <div className='bg-[#1e1e1e] rounded-xl shadow-md shadow-black/10 p-6 mt-6'>
            <h2 className='text-xl font-bold text-gray-100 mb-6'>Task Overview</h2>
            <div className='bg-black mb-4 py-3 px-6 flex justify-between rounded-lg'>
                <h2 className='w-1/5 font-semibold text-gray-300'>Employee Name</h2>
                <h3 className='w-1/5 font-semibold text-center text-gray-300'>New Task</h3>
                <h5 className='w-1/5 font-semibold text-center text-gray-300'>Active Task</h5>
                <h5 className='w-1/5 font-semibold text-center text-gray-300'>Completed</h5>
                <h5 className='w-1/5 font-semibold text-center text-gray-300'>Failed</h5>
                <h5 className='w-1/5 font-semibold text-center text-gray-300'>Action</h5>
            </div>
            <div className='overflow-auto max-h-[300px]'>
                {userData.map((element) => (
                    <div
                        key={element._id}
                        className='bg-[#1e1e1e] border border-gray-800 hover:bg-[#222222] mb-2 py-3 px-6 flex justify-between rounded-lg transition-all duration-200'>
                        <h2 className='w-1/5  text-gray-100'>{element.firstName}</h2>
                        <h3 className='w-1/5 text-center text-gray-300'>{element.taskCounts.newTask}</h3>
                        <h5 className='w-1/5 text-center text-gray-300'>{element.taskCounts.active}</h5>
                        <h5 className='w-1/5 text-center text-gray-300'>{element.taskCounts.completed}</h5>
                        <h5 className='w-1/5 text-center text-gray-300'>{element.taskCounts.failed}</h5>
                        <div className='w-1/5 text-center'>
                            <button
                                onClick={() => setSelectedUser(element)}
                                className='bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors'>
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedUser && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
                    <div className='bg-[#1e1e1e] p-6 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3 className='text-2xl font-bold text-gray-100'>{selectedUser.firstName}'s Tasks</h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className='text-gray-400 hover:text-white text-2xl'>
                                &times;
                            </button>
                        </div>

                        <div className='overflow-y-auto flex-1 space-y-3 pr-2'>
                            {!selectedUser.tasks || selectedUser.tasks.length === 0 ? (
                                <p className='text-gray-400 text-center py-8'>No tasks found.</p>
                            ) : (
                                selectedUser.tasks.map(task => (
                                    <div key={task._id} className='bg-[#2a2a2a] p-4 rounded-lg flex justify-between items-start border border-gray-700'>
                                        <div className='w-3/4'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <h4 className='text-lg font-semibold text-emerald-400'>{task.taskTitle}</h4>
                                                <span className='text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded'>{task.category}</span>
                                            </div>
                                            <p className='text-gray-300 text-sm mb-2'>{task.taskDescription}</p>
                                            <div className='flex gap-2 text-xs'>
                                                <span className={`px-2 py-0.5 rounded ${task.completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                                                    {task.completed ? 'Completed' : 'Pending'}
                                                </span>
                                                <span className='text-gray-500'>{task.taskDate}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedUser._id, task._id)}
                                            className='bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded text-sm transition-colors border border-red-500/50'>
                                            Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllTask