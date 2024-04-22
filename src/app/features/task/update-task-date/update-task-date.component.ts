import { Component, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskFacade } from '@entities/task/model/task.facade';
import { Task } from '@entities/task/model/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    MAT_DATE_LOCALE,
    provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UpdateTaskTitleComponent } from '../update-task-title/update-task-title.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-update-task-date',
    standalone: true,
    templateUrl: './update-task-date.component.html',
    styleUrl: './update-task-date.component.scss',
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        provideNativeDateAdapter(),
    ],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        UpdateTaskTitleComponent,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        UpdateTaskDateComponent,
        MatTooltipModule,
    ],
})
export class UpdateTaskDateComponent {
    @Input() task!: Task;
    dueDate: FormControl = new FormControl('');
    isEditing: boolean = false;
    private readonly taskFacade = inject(TaskFacade);

    dateForm = new FormGroup({
        dueDate: this.dueDate,
    });

    constructor() {
        this.dateForm
            .get('dueDate')
            ?.valueChanges.pipe(takeUntilDestroyed())
            .subscribe((value) => {
                this.saveTaskDueDate(value);
            });
    }

    saveTaskDueDate(date: Date): void {
        const task = {
            id: this.task.id,
            title: this.task.title,
            sectionId: this.task.sectionId,
            dueDate: date,
        };
        this.taskFacade.updateTask(task);
        this.toggleEditing();
    }

    toggleEditing(event?: MouseEvent): void {
        this.isEditing = !this.isEditing;
        event?.stopPropagation();
    }

    handleInputClick(event: MouseEvent): void {
        event.stopPropagation();
    }
}
