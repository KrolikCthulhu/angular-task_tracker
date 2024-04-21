import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store';
import { addTask, deleteTask, updateTask } from './task.actions';
import { Task } from './task.model';
import * as TaskActions from './task.actions';
import { Section } from '@entities/section/model/section.model';

@Injectable({
    providedIn: 'root',
})
export class TaskFacade {
    private readonly store = inject(Store<AppState>);

    addTask(task: Task): void {
        this.store.dispatch(addTask({ task }));
    }

    updateTask(updatedTask: Task): void {
        this.store.dispatch(updateTask({ updatedTask }));
    }

    deleteTask(sectionId: Section['id'], taskId: Task['id']): void {
        this.store.dispatch(deleteTask({ sectionId, taskId }));
    }
}
