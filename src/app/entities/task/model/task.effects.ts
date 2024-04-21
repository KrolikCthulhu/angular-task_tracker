import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { TaskService } from '../api/task.service';

@Injectable()
export class TaskEffects {
    private taskService = inject(TaskService);
    private actions$ = inject(Actions);

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.addTask),
            switchMap(({ task }) =>
                this.taskService.addTask(task).pipe(
                    map((sections) => TaskActions.addTaskSuccess({ sections })),
                    catchError((error) =>
                        of(TaskActions.addTaskFailure({ error }))
                    )
                )
            )
        )
    );

    // addTask$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TaskActions.addTask),
    //         switchMap(({ task }) =>
    //             this.taskService.addTask(task).pipe(
    //                 map((sections) => TaskActions.addTaskSuccess({ sections })),
    //                 catchError((error) =>
    //                     of(TaskActions.addTaskFailure({ error }))
    //                 )
    //             )
    //         )
    //     )
    // );

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            switchMap(({ updatedTask }) =>
                this.taskService.updateTask(updatedTask).pipe(
                    map((sections) =>
                        TaskActions.updateTaskSuccess({ sections })
                    ),
                    catchError((error) =>
                        of(TaskActions.updateTaskFailure({ error }))
                    )
                )
            )
        )
    );

    constructor() {}
}
