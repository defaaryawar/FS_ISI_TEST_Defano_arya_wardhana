import React, { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTaskHandlers from './hooks/useTaskHandlers';

/**
 * Main App Component
 * 
 * Sekarang jadi super clean karena semua logic udah dipindahin
 * ke custom hook useTaskHandlers. Keren kan?
 */
const App: React.FC = () => {
  const {
    isLoading,
    error,
    editingTask,
    loadTasks,
    handleAddTask,
    handleUpdateTask,
    handleToggleStatus,
    handleDeleteTask,
    handleEditTask,
    handleCancelEdit,
    getFilteredTasks
  } = useTaskHandlers();

  // Fetch tasks pas component mount doang
  useEffect(() => {
    loadTasks();
  }, []);

  // Ambil filtered tasks dari custom hook
  const { ongoingTasks, completedTasks } = getFilteredTasks();

  return (
    <div className="max-w-2xl mx-auto md:p-4 p-8">
      <h1 className="md:text-4xl text-3xl font-bold text-center mb-8">Task Management</h1>

      <TaskForm
        onSubmit={editingTask ? (title) => handleUpdateTask(title, editingTask.id) : handleAddTask}
        editingTask={editingTask}
        onCancel={handleCancelEdit}
      />

      {isLoading ? (
        <div className="text-center py-4">Loading tasks...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <TaskList
          ongoingTasks={ongoingTasks}
          completedTasks={completedTasks}
          onToggleStatus={handleToggleStatus}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default App;