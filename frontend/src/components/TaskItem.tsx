import React from 'react';
import { Pencil, X, CheckCircle, Circle } from 'lucide-react';
import type { Task } from '../types';

interface TaskItemProps {
    task: Task;
    onToggleStatus: (id: number) => Promise<void>;
    onDeleteTask: (id: number) => Promise<void>;
    onEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onToggleStatus,
    onDeleteTask,
    onEditTask,
}) => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(date);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-2">
            <div className="flex items-center">
                {task.completed ? (
                    <CheckCircle
                        className="h-6 w-6 text-green-500 cursor-pointer mr-2"
                        onClick={() => onToggleStatus(task.id)}
                    />
                ) : (
                    <Circle
                        className="h-6 w-6 text-gray-400 cursor-pointer mr-2"
                        onClick={() => onToggleStatus(task.id)}
                    />
                )}
                <div>
                    <div className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatDate(task.created_at)}
                    </div>
                </div>
            </div>
            <div className="flex">
                <button
                    onClick={() => onEditTask(task)}
                    className="p-1 text-gray-500 hover:text-blue-500 focus:outline-none"
                    aria-label="Edit task"
                >
                    <Pencil className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-1 text-gray-500 hover:text-red-500 focus:outline-none ml-2"
                    aria-label="Delete task"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;