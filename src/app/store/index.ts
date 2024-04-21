import { ActionReducerMap } from '@ngrx/store';
import * as Section from '@entities/section/model/section.reducer';
import * as Task from '@entities/task/model/task.reducer';
import { SectionEffects } from '@entities/section/model/section.effects';
import { TaskEffects } from '@entities/task/model/task.effects';

export interface AppState {
    sections: Section.SectionState;
    tasks: Task.TaskState;
}

export const appReducers: ActionReducerMap<AppState> = {
    sections: Section.sectionReducer,
    tasks: Task.taskReducer,
};

export const appEffects = [SectionEffects, TaskEffects];
