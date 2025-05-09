// src/hooks/useTaskHandlers.tsx
import { useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from '../services/api';
import type { Task } from '../types';

/**
 * Custom Hook buat handle semua task operations
 * Literally separating concerns biar code di App.tsx jadi cleaner
 */
const useTaskHandlers = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Load semua tasks dari API
    const loadTasks = async (): Promise<void> => {
        console.log('🔄 Loading tasks...');
        try {
            setIsLoading(true);
            const data = await fetchTasks();
            setTasks(data);
            setError(null);
            console.log(`✅ Berhasil load ${data.length} tasks!`);
        } catch (err) {
            setError('Gagal load tasks nih. Coba refresh lagi deh.');
            console.error('🚨 Error loading tasks:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Add task baru
    const handleAddTask = async (title: string): Promise<void> => {
        console.log('➕ Adding new task:', title);
        try {
            const newTask = await createTask({ title });
            setTasks((prevTasks) => [newTask, ...prevTasks]);
            console.log('✅ Task berhasil ditambahkan!');
        } catch (err) {
            setError('Gagal nambahin task. Coba lagi ya.');
            console.error('🚨 Error adding task:', err);
        }
    };

    // Update task yang udah ada
    const handleUpdateTask = async (title: string, id?: number): Promise<void> => {
        if (!id) {
            console.error('⚠️ Task ID missing waktu update');
            return;
        }

        console.log('✏️ Updating task:', id, title);
        try {
            const updatedTask = await updateTask(id, { title });
            setTasks((prevTasks) =>
                prevTasks.map(task => task.id === id ? updatedTask : task)
            );
            setEditingTask(null);
            console.log('✅ Task updated successfully!');
        } catch (err) {
            setError('Gagal update task. Coba lagi deh.');
            console.error('🚨 Error updating task:', err);
        }
    };

    // Toggle status task (complete/incomplete)
    const handleToggleStatus = async (id: number): Promise<void> => {
        console.log('🔄 Toggling task status:', id);
        try {
            const updatedTask = await toggleTaskStatus(id);
            setTasks((prevTasks) =>
                prevTasks.map(task => task.id === id ? updatedTask : task)
            );
            console.log(`✅ Task status changed to ${updatedTask.completed ? 'completed' : 'ongoing'}`);
        } catch (err) {
            setError('Gagal ganti status task. Coba lagi ya.');
            console.error('🚨 Error toggling task status:', err);
        }
    };

    // Delete task
    const handleDeleteTask = async (id: number): Promise<void> => {
        console.log('🗑️ Deleting task:', id);
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
            console.log('✅ Task deleted successfully!');
        } catch (err) {
            setError('Gagal delete task. Coba lagi deh.');
            console.error('🚨 Error deleting task:', err);
        }
    };

    // Set task for editing
    const handleEditTask = (task: Task): void => {
        console.log('✏️ Setting task for edit:', task.id);
        setEditingTask(task);
    };

    // Cancel editing
    const handleCancelEdit = (): void => {
        console.log('❌ Canceling edit mode');
        setEditingTask(null);
    };

    // Filter & sort tasks buat display
    const getFilteredTasks = () => {
        const ongoingTasks = tasks
            .filter(task => !task.completed)
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        const completedTasks = tasks
            .filter(task => task.completed)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return { ongoingTasks, completedTasks };
    };

    return {
        tasks,
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
    };
};

export default useTaskHandlers;