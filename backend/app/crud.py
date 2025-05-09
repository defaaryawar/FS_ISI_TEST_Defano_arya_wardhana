import logging
from sqlalchemy.orm import Session
from . import models, schemas

# Configure logging
logger = logging.getLogger(__name__)

def get_tasks(db: Session):
    """Get all tasks"""
    logger.info("Fetching all tasks from database")
    tasks = db.query(models.Task).all()
    logger.info(f"Retrieved {len(tasks)} tasks from database")
    for task in tasks:
        logger.debug(f"Task retrieved: ID={task.id}, Title={task.title}, Completed={task.completed}")
    return tasks

def get_task(db: Session, task_id: int):
    """Get a specific task by ID"""
    logger.info(f"Attempting to fetch task with ID: {task_id}")
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        logger.info(f"Found task with ID {task_id}: {task.title}")
    else:
        logger.warning(f"Task with ID {task_id} not found")
    return task

def create_task(db: Session, task: schemas.TaskCreate):
    """Create a new task"""
    logger.info(f"Creating new task: {task.title}")
    db_task = models.Task(title=task.title, completed=task.completed if hasattr(task, 'completed') else False)
    
    try:
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        logger.info(f"Successfully created task with ID: {db_task.id}")
        logger.debug(f"Task details: ID={db_task.id}, Title={db_task.title}, Completed={db_task.completed}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating task: {str(e)}")
        raise
    
    return db_task

def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    """Update a task"""
    logger.info(f"Attempting to update task with ID: {task_id}")
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if db_task is None:
        logger.warning(f"Task with ID {task_id} not found for update")
        return None
    
    # Update task attributes
    update_data = task.dict(exclude_unset=True)
    logger.info(f"Updating task {task_id} with data: {update_data}")
    
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    try:
        db.commit()
        db.refresh(db_task)
        logger.info(f"Successfully updated task with ID: {task_id}")
        logger.debug(f"Updated task details: {db_task.title}, Completed: {db_task.completed}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating task: {str(e)}")
        raise
    
    return db_task

def delete_task(db: Session, task_id: int):
    """Delete a task"""
    logger.info(f"Attempting to delete task with ID: {task_id}")
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if db_task is None:
        logger.warning(f"Task with ID {task_id} not found for deletion")
        return False
    
    try:
        db.delete(db_task)
        db.commit()
        logger.info(f"Successfully deleted task with ID: {task_id}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting task: {str(e)}")
        raise
    
    return True

def toggle_task_status(db: Session, task_id: int):
    """Toggle task completion status"""
    logger.info(f"Attempting to toggle status for task with ID: {task_id}")
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if db_task is None:
        logger.warning(f"Task with ID {task_id} not found for toggling status")
        return None
    
    try:
        # Toggle the completed status
        db_task.completed = not db_task.completed
        db.commit()
        db.refresh(db_task)
        logger.info(f"Successfully toggled task {task_id} status to: {db_task.completed}")
    except Exception as e:
        db.rollback()
        logger.error(f"Error toggling task status: {str(e)}")
        raise
    
    return db_task