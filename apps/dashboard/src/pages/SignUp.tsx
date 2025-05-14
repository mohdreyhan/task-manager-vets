import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchOrganizations } from '../store/organizationSlice';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.organizations);

  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'User',
    organizationId: '',
  });

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...form };
    if (form.role === 'admin') {
      delete payload.organizationId;
    }

    const result = await dispatch(signupUser(payload));

    if (signupUser.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          className="w-full p-2 border rounded"
          placeholder="Username"
          required
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          className="w-full p-2 border rounded"
          placeholder="Password"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        {form.role !== 'admin' && (
          <select
            name="organizationId"
            value={form.organizationId}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
          >
            <option disabled value="">
              Select Organization
            </option>
            {list?.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        )}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full mt-2 border border-gray-300 text-gray-700 p-2 rounded hover:bg-gray-100"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
