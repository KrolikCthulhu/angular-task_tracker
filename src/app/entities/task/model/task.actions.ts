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
