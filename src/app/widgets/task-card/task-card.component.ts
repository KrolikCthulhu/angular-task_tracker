import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '@entities/task/model/task.model';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UpdateTaskTitleComponent } from '../../features/task/update-task-title/update-task-title.component';

@Component({
    selector: 'app-task-card',
    standalone: true,
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.scss',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        UpdateTaskTitleComponent,
    ],
})
export class TaskCardComponent {
    @Input() task!: Task;
    taskTitle: FormControl = new FormControl('');
}
