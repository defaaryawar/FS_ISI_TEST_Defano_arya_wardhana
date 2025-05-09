import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types';

interface TaskListProps {
    ongoingTasks: Task[];
    completedTasks: Task[];
    onToggleStatus: (id: number) => Promise<void>;
    onDeleteTask: (id: number) => Promise<void>;
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    ongoingTasks,
    completedTasks,
    onToggleStatus,
    onDeleteTask,
    onEditTask,
}) => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Ongoing Task</h2>
                {ongoingTasks.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">No ongoing tasks</div>
                ) : (
                    ongoingTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleStatus={onToggleStatus}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                        />
                    ))
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Completed Task</h2>
                {completedTasks.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">No completed tasks</div>
                ) : (
                    completedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleStatus={onToggleStatus}
                            onDeleteTask={onDeleteTask}
                            onEditTask={onEditTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;