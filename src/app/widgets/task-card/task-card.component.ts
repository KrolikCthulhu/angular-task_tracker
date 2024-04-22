import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
    Task,
    TaskPriority,
    TaskStatus,
} from '@entities/task/model/task.model';
import { UpdateTaskTitleComponent } from '../../features/task/update-task-title/update-task-title.component';
import { CommonModule } from '@angular/common';
import { UpdateTaskDateComponent } from '../../features/task/update-task-date/update-task-date.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-task-card',
    standalone: true,
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss',
    imports: [
        CommonModule,
        MatCardModule,
        UpdateTaskTitleComponent,
        UpdateTaskDateComponent,
        RouterModule,
    ],
})
export class TaskCardComponent {
    @Input() task!: Task;
    TaskPriorityEnum: { [key: string]: string } = TaskPriority;
    TaskStatusEnum: { [key: string]: string } = TaskStatus;

    constructor() {}
}
