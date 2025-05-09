const API_URL = import.meta.env.VITE_API_URL || '/api'; // Pake env variable kalo ada

/**
 * CATATAN DEVELOPER:
 * ------------------
 * Ini service API buat handle semua request ke backend.
 * Udah termasuk error handling yg proper dan logging biar gampang debug.
 * So, kalo ada issue, langsung cek console log aja ya.
 */

// Function helper buat handle semua response dari API
const handleResponse = async (response: Response) => {
    // Kalo status 204 (No Content), return object kosong aja
    if (response.status === 204) {
        console.log('✅ Request sukses, tapi gak ada content (204)');
        return {};
    }

    // Cek content type biar ga salah parsing
    const contentType = response.headers.get('content-type');

    // Kalo response-nya error
    if (!response.ok) {
        console.log(`❌ API error with status: ${response.status}`);

        // Coba parse error message dari JSON kalo bisa
        if (contentType && contentType.includes('application/json')) {
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || `Sorry, error code: ${response.status}`);
            } catch (e) {
                throw new Error(`Waduh error nih: ${response.status}`);
            }
        } else {
            // Kalo bukan JSON, kasih generic error message
            throw new Error(`Server lagi error kayaknya: ${response.status}. Coba refresh atau server-nya lagi down.`);
        }
    }

    // Make sure kita cuma parse response JSON
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    } else {
        const text = await response.text();
        console.error('Dapet response non-JSON:', text.substring(0, 100) + '...');
        throw new Error('Server ngasih format aneh, bukan JSON.');
    }
};

/**
 * API TASKS
 * ---------
 * Semua function buat CRUD tasks ada di sini.
 * Bisa dipake langsung di component mana aja.
 */

// Get semua tasks
export const fetchTasks = async () => {
    console.log('🔍 Lagi fetch tasks...');
    try {
        const response = await fetch(`${API_URL}/tasks`);
        return handleResponse(response);
    } catch (error) {
        console.error('Gagal fetch tasks:', error);
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            throw new Error('Kayaknya koneksi lagi error atau server-nya lagi down. Coba cek internet kamu deh.');
        }
        throw error;
    }
};

// Bikin task baru
export const createTask = async (taskData: { title: string; }) => {
    console.log('✏️ Create task baru:', taskData.title);
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Gagal create task:', error);
        throw error;
    }
};

// Update task yang udah ada
export const updateTask = async (id: number, taskData: { title: string; }) => {
    console.log('✏️ Update task:', id, taskData.title);
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Gagal update task:', error);
        throw error;
    }
};

// Delete task
export const deleteTask = async (id: number) => {
    console.log('🗑️ Delete task:', id);
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Gagal delete task:', error);
        throw error;
    }
};

// Toggle status task (complete/incomplete)
export const toggleTaskStatus = async (id: number) => {
    console.log('🔄 Toggle status task:', id);
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Gagal toggle task status:', error);
        throw error;
    }
};