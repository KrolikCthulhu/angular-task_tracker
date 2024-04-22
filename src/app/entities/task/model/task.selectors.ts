import { createSelector } from '@ngrx/store';
import * as fromReducer from './task.reducer';
import { TaskState } from './task.reducer';

export const selectTaskState = (state: { tasks: fromReducer.TaskState }) =>
    state.tasks;

export const selectTaskById = (taskId: string) =>
    createSelector(
        (state: { tasks: TaskState }) => state.tasks,
        (tasks: TaskState) => tasks.entities[taskId]
    );
