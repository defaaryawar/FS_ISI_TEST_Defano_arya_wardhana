import type { Task, TaskFormData } from '../types';

const API_URL = import.meta.env.API_URL || 'http://localhost:8000/api';

// Error handling helper
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Error: ${response.status}`;
        throw new Error(errorMessage);
    }
    return response.json();
};

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    return handleResponse(response);
};

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return handleResponse(response);
};

// Update a task
export const updateTask = async (id: number, taskData: TaskFormData): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return handleResponse(response);
};

// Toggle task completion status
export const toggleTaskStatus = async (id: number): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: 'PUT',
    });
    return handleResponse(response);
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};