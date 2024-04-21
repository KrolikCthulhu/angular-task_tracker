import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from './task.model';
import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<Task> {}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState();

export const taskReducer = createReducer(
    initialState
    // on(TaskActions.addTask, (state, { task }) => adapter.addOne(task, state)),
    // on(
    //     TaskActions.editTaskSuccess,
    //     (state, { taskId, sectionId, editedParams }) => {
    //         return adapter.updateOne(
    //             { id: taskId, changes: editedParams },
    //             state
    //         );
    //     }
    // )
);
