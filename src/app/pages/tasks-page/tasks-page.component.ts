import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '@entities/section/model/section.model';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../../widgets/section-card/section-card.component';
import { AddSectionComponent } from '../../features/section/add-section/add-section.component';
import { SectionFacade } from '@entities/section/model/section.facade';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Task, TaskStatus } from '@entities/task/model/task.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks-page.component.html',
    styleUrl: './tasks-page.component.scss',
    imports: [
        CommonModule,
        SectionCardComponent,
        AddSectionComponent,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
    private readonly sectionFacade = inject(SectionFacade);
    sections$: Observable<Section[]> = this.sectionFacade.sections$;
    loading$: Observable<boolean> = this.sectionFacade.loading$;
    TaskStatusEnum: { [key: string]: string } = TaskStatus;

    statuses = [
        { value: 'todo', viewValue: this.TaskStatusEnum['todo'] },
        { value: 'inProgress', viewValue: this.TaskStatusEnum['inProgress'] },
        { value: 'done', viewValue: this.TaskStatusEnum['done'] },
    ];
    taskStatus = new FormControl('');

    constructor() {
        this.sectionFacade.loadSections();
    }

    clearFilter(): void {
        this.sections$ = this.sectionFacade.sections$;
        this.taskStatus.reset();
    }

    updateTaskStatus(): void {
        if (this.taskStatus.value) {
            this.sections$ = this.sectionFacade.getSectionsFilteredByTaskStatus(
                this.taskStatus.value as Task['status']
            );
        }
    }
}
