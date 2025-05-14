import Header from '../components/Header';
import TaskTable from '../components/tasks/TaskTable';

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Header />

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <TaskTable />
    </div>
  );
};

export default Dashboard;
