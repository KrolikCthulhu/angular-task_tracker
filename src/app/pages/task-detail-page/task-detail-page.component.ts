import { Component, inject } from '@angular/core';
import { UpdateTaskTitleComponent } from '../../features/task/update-task-title/update-task-title.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Task } from '@entities/task/model/task.model';
import { CommonModule } from '@angular/common';
import { UpdateTaskDateComponent } from '../../features/task/update-task-date/update-task-date.component';
import { SectionFacade } from '@entities/section/model/section.facade';
import { Section } from '@entities/section/model/section.model';
import { UpdateTaskStatusComponent } from '../../features/task/update-task-status/update-task-status.component';
import { UpdateTaskPriorityComponent } from '../../features/task/update-task-priority/update-task-priority.component';

@Component({
    selector: 'app-task-detail-page',
    standalone: true,
    templateUrl: './task-detail-page.component.html',
    styleUrl: './task-detail-page.component.scss',
    imports: [
        UpdateTaskTitleComponent,
        CommonModule,
        UpdateTaskDateComponent,
        UpdateTaskStatusComponent,
        UpdateTaskPriorityComponent,
    ],
})
export class TaskDetailPageComponent {
    route = inject(ActivatedRoute);
    private readonly sectionFacade = inject(SectionFacade);
    readonly sections$: Observable<Section[]> = this.sectionFacade.sections$;
    readonly task$: Observable<Task | null> = this.route.params.pipe(
        switchMap((params) => {
            const id = params['id'];
            return this.sections$.pipe(
                map((sections) => {
                    for (const section of sections) {
                        const task = section.tasks.find(
                            (task) => task.id === id
                        );
                        if (task) {
                            return task;
                        }
                    }
                    return null;
                })
            );
        })
    );

    constructor() {
        this.sectionFacade.loadSections();
    }
}
