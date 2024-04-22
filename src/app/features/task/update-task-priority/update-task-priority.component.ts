import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskFacade } from '@entities/task/model/task.facade';
import { Task, TaskPriority } from '@entities/task/model/task.model';

@Component({
    selector: 'app-update-task-priority',
    standalone: true,
    imports: [
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    templateUrl: './update-task-priority.component.html',
    styleUrl: './update-task-priority.component.scss',
})
export class UpdateTaskPriorityComponent implements OnInit {
    @Input() task!: Task;
    isEditing: boolean = false;

    private readonly taskFacade = inject(TaskFacade);
    TaskPriorityEnum: { [key: string]: string } = TaskPriority;

    priorities = [
        { value: 'low', viewValue: this.TaskPriorityEnum['low'] },
        { value: 'medium', viewValue: this.TaskPriorityEnum['medium'] },
        { value: 'high', viewValue: this.TaskPriorityEnum['high'] },
    ];
    taskPriority = new FormControl('');

    constructor() {}

    ngOnInit(): void {
        if (this.task.priority) this.taskPriority.setValue(this.task.priority);
    }

    updateTaskPriority(): void {
        if (this.taskPriority.value) {
            const task = {
                id: this.task.id,
                title: this.task.title,
                sectionId: this.task.sectionId,
                priority: this.taskPriority.value as Task['priority'],
            };
            this.taskFacade.updateTask(task);
        }
    }

    toggleEditing(event?: MouseEvent): void {
        this.isEditing = !this.isEditing;
        event?.stopPropagation();
    }
}
