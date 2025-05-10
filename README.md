# FS_ISI_TEST_Defano Arya Wardhana

## 📋 Deskripsi Proyek
Aplikasi **ToDo List** berbasis web menggunakan **React + FastAPI** dengan database **PostgreSQL**. Aplikasi ini mendukung pembuatan, pengeditan, penghapusan, dan penyelesaian task. Task dibagi menjadi dua kategori: "Perlu Dikerjakan" dan "Sudah Selesai", masing-masing diurutkan berdasarkan waktu.

### Fitur utama:
- ✅ Tambah, edit, dan hapus task
- ✅ Tandai task sebagai selesai
- ✅ Task terpisah dan terurut berdasarkan status dan waktu
- ✅ Form dinamis saat edit task
- ✅ UI responsif mengikuti desain Figma
- ✅ API backend dengan FastAPI + PostgreSQL
- ✅ Full containerization dengan Docker Compose

## 🎥 Video Presentasi
📽️ [Tonton video demo di sini](https://drive.google.com/file/d/1vY77-DIgToWhl-X5UPKeUfN3Pd3jNLZ_/view?usp=sharing)

## 🧱 Struktur Proyek
```
fullstack-engineer-assessment/
│
├── frontend/                      # React frontend with TypeScript
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.tsx       # Form for adding/editing tasks
│   │   │   ├── TaskItem.tsx       # Individual task item
│   │   │   └── TaskList.tsx       # Lists for ongoing and completed tasks
│   │   ├── services/
│   │   │   └── api.ts             # API integration functions
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces and types
│   │   ├── App.tsx                # Main application component
│   │   ├── index.tsx              # Entry point
│   │   └── index.css              # Global styles (including Tailwind)
│   ├── package.json
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   └── Dockerfile                 # Frontend Docker configuration
│
├── backend/                      # Python backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI main application 
│   │   ├── models.py             # Database models
│   │   ├── schemas.py            # Pydantic schemas
│   │   ├── crud.py               # Database CRUD operations
│   │   ├── database.py           # Database configuration
│   │   └── routes.py             # API routes
│   ├── requirements.txt          # Python dependencies
│   └── Dockerfile                # Backend Docker configuration
│
├── docker-compose.yml            # Docker Compose configuration
└── README.md                     # Project documentation
```

## ⚙️ Cara Menjalankan Proyek

### 1. Persiapan
Pastikan kamu sudah menginstall:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Jalankan Aplikasi
```bash
docker login
docker-compose up --build
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- PostgreSQL: localhost:5432

### 3. Endpoint API
http://localhost:8000/api/task (Fetch utama)
http://localhost:8000/api/task/{task_id}

## 🧪 Pengujian
Pastikan semua fitur dapat digunakan:
- Tambah task
- Edit task
- Hapus task
- Tandai task selesai
- Urutan task sesuai ketentuan

## 🗃️ Database
Menggunakan PostgreSQL dengan relasi sederhana. Skema dapat ditemukan di `models.py`.

## 🖼️ Desain UI
Desain UI mengacu pada Figma yang disediakan oleh instruksi.

## 📦 Deployment & Docker
Semua service (frontend, backend, database) berjalan melalui Docker Compose. Konfigurasi masing-masing service tersedia di Dockerfile masing-masing folder.

## 📌 Catatan
- Tanpa framework komponen UI seperti ChakraUI atau shadcn/ui.
- Menggunakan lucide-react untuk ikon.
