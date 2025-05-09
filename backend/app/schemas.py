from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    title: str


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass


class TaskInDB(TaskBase):
    id: int
    completed: bool
    created_at: datetime

    class Config:
        orm_mode = True


class Task(TaskInDB):
    pass


class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: datetime


class ResponseModel(BaseModel):
    data: dict
    message: Optional[str] = None