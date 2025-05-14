import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/userSlice';
import { createTask, updateTask } from '../../store/taskSlice';
import { fetchOrganizations } from '../../store/organizationSlice';

const TaskModal = ({ isOpen, onClose, task }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    organizationId: '',
    assignedTo: '',
  });

  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector(state => state.users);
  const { list } = useSelector(state => state.organizations); // Assuming you're fetching organizations

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when the modal opens
    dispatch(fetchOrganizations())
  }, [dispatch]);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        organizationId: task.organizationId,
        assignedTo: task.assignedTo,
      });
    }
  }, [task]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (task) {
      dispatch(updateTask({ id: task.id, ...formData }));
    } else {
      dispatch(createTask(formData));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{task ? 'Edit' : 'Create'} Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          />

          {/* Status Dropdown */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          >
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Organization Dropdown */}
          <select
            name="organizationId"
            value={formData.organizationId}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          >
            <option disabled value="">Select Organization</option>
            {list?.map(org => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>

          {/* Assign To Dropdown */}
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          >
            <option disabled value="">Assign To</option>
            {users?.filter(item=> item.username !== "adminuser").map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
