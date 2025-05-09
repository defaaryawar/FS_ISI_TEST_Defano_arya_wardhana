import React, { useState, useEffect } from 'react';
import type { Task } from '../types';

interface TaskFormProps {
    onSubmit: (title: string, id?: number) => Promise<void>;
    editingTask: Task | null;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancel }) => {
    const [title, setTitle] = useState<string>('');

    // Update form when editing task changes
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
        } else {
            setTitle('');
        }
    }, [editingTask]);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!title.trim()) return;

        if (editingTask) {
            await onSubmit(title, editingTask.id);
        } else {
            await onSubmit(title);
        }

        setTitle('');
    };

    return (
        <div className="mb-8">
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                />
            </div>

            <div className="flex justify-center space-x-4">
                {editingTask ? (
                    <>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Update Task
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskForm;