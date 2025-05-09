// Task interface
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
}

// API response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

// Form submission types
export interface TaskFormData {
    title: string;
}

// Task toggle response
export interface TaskToggleResponse {
    id: number;
    completed: boolean;
}