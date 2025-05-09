from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from . import crud, schemas, database

router = APIRouter(prefix="/api", tags=["tasks"])


@router.get("/tasks", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(database.get_db)):
    """Get all tasks"""
    tasks = crud.get_tasks(db)
    return tasks


@router.post("/tasks", response_model=schemas.Task, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    """Create a new task"""
    return crud.create_task(db, task)


@router.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(database.get_db)):
    """Get a specific task by ID"""
    db_task = crud.get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(database.get_db)):
    """Update a task"""
    db_task = crud.update_task(db, task_id, task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    """Delete a task"""
    success = crud.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return None


@router.put("/tasks/{task_id}/toggle", response_model=schemas.Task)
def toggle_task_status(task_id: int, db: Session = Depends(database.get_db)):
    """Toggle task completion status"""
    db_task = crud.toggle_task_status(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task