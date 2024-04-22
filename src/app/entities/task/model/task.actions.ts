import { createAction, props } from '@ngrx/store';
import { Task } from './task.model';
import { Section } from '@entities/section/model/section.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const addTaskSuccess = createAction(
    '[Task] Add Task Success',
    props<{ sections: Section[] }>()
);

export const addTaskFailure = createAction(
    '[Task] Add Task Failure',
    props<{ error: any }>()
);

export const updateTask = createAction(
    '[Task] Update Task',
    props<{ updatedTask: Task }>()
);

export const updateTaskSuccess = createAction(
    '[Task] Update Task Success',
    props<{ sections: Section[] }>()
);

export const updateTaskFailure = createAction(
    '[Task] Update Task Failure',
    props<{ error: any }>()
);

export const deleteTask = createAction(
    '[Task] Delete Task',
    props<{ sectionId: Section['id']; taskId: Task['id'] }>()
);

export const deleteTaskSuccess = createAction(
    '[Task] Delete Task Success',
    props<{ sections: Section[] }>()
);

export const deleteTaskFailure = createAction(
    '[Task] Delete Task Failure',
    props<{ error: any }>()
);

export const loadTask = createAction(
    '[Task] Load Task',
    props<{ taskId: string }>()
);

export const loadTaskSuccess = createAction(
    '[Task] Load Task Success',
    props<{ task: Task }>()
);

export const loadTaskFailure = createAction(
    '[Task] Load Task Failure',
    props<{ error: any }>()
);

export const filterTasksByStatus = createAction(
    '[Task] Filter Tasks By Status',
    props<{ status: Task['status'] }>()
);
