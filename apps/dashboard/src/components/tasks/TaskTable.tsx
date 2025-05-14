import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskModal from './TaskModal';
import { deleteTask, fetchTasks } from '../../store/taskSlice';

const TaskTable = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector(state => state.tasks);
  const { user, users } = useSelector(state => state.users); // Assuming userSlice

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const openEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

    const getUsername = (userId) => {
    const foundUser = users?.find(u => u.id === userId);
    return foundUser ? foundUser.username : 'Unknown';
  };


  const canEdit = (task) =>
    user?.role === 'admin' ||
    user?.role === 'manager' ||
    (user?.role === 'user' && task.assignedTo === user.id);

  const canDelete = user?.role === 'admin' || user?.role === 'manager';

  // Filter tasks based on role
  const visibleTasks = tasks?.filter(task => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'manager') return task.organizationId === user.organizationId;
    return task.assignedTo === user.id;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => {
            setSelectedTask(null);
            setModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleTasks?.map(task => (
              <tr key={task.id} className="border-b">
                <td className="p-2 border">{task.title}</td>
                <td className="p-2 border">{task.description}</td>
                <td className="p-2 border">{task.status}</td>
                <td className="p-2 border">{getUsername(task.assignedTo)}</td>
                <td className="p-2 border flex gap-2">
                  {canEdit(task) && (
                    <button onClick={() => openEdit(task)} className="bg-yellow-400 px-2 py-1 rounded">
                      Edit
                    </button>
                  )}
                  {canDelete && (
                    <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} task={selectedTask} />
    </div>
  );
};

export default TaskTable;
