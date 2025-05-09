from sqlalchemy.orm import Session
from . import models, schemas


def get_tasks(db: Session):
    """Get all tasks"""
    return db.query(models.Task).all()


def create_task(db: Session, task: schemas.TaskCreate):
    """Create a new task"""
    db_task = models.Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task(db: Session, task_id: int):
    """Get a specific task by ID"""
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    """Update a task"""
    db_task = get_task(db, task_id)
    if db_task:
        update_data = task.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_task, key, value)
        db.commit()
        db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    """Delete a task"""
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
        return True
    return False


def toggle_task_status(db: Session, task_id: int):
    """Toggle task completion status"""
    db_task = get_task(db, task_id)
    if db_task:
        db_task.completed = not db_task.completed
        db.commit()
        db.refresh(db_task)
    return db_task