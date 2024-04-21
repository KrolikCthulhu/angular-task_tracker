import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '@entities/task/model/task.model';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskTitleComponent } from '../../features/task/update-task-title/update-task-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    MAT_DATE_LOCALE,
    provideNativeDateAdapter,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UpdateTaskDateComponent } from '../../features/task/update-task-date/update-task-date.component';

@Component({
    selector: 'app-task-card',
    standalone: true,
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss',
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
    ],
})
export class TaskCardComponent {
    @Input() task!: Task;

    constructor() {}
}
