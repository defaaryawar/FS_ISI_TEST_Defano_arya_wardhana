import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from './services/api';
import type { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string): Promise<void> => {
    try {
      const newTask = await createTask({ title });
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (title: string, id?: number): Promise<void> => {
    if (!id) return; // id should always be provided when editing, but we need to handle the case

    try {
      const updatedTask = await updateTask(id, { title });
      setTasks((prevTasks) =>
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleToggleStatus = async (id: number): Promise<void> => {
    try {
      const updatedTask = await toggleTaskStatus(id);
      setTasks((prevTasks) =>
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
    } catch (err) {
      setError('Failed to toggle task status. Please try again.');
      console.error('Error toggling task status:', err);
    }
  };

  const handleDeleteTask = async (id: number): Promise<void> => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleEditTask = (task: Task): void => {
    setEditingTask(task);
  };

  const handleCancelEdit = (): void => {
    setEditingTask(null);
  };

  // Filter ongoing and completed tasks
  const ongoingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const completedTasks = tasks
    .filter(task => task.completed)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Task Management</h1>

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