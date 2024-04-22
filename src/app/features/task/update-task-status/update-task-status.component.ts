import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskFacade } from '@entities/task/model/task.facade';
import { Task, TaskStatus } from '@entities/task/model/task.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-update-task-status',
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
    templateUrl: './update-task-status.component.html',
    styleUrl: './update-task-status.component.scss',
})
export class UpdateTaskStatusComponent implements OnInit {
    @Input() task!: Task;
    isEditing: boolean = false;

    private readonly taskFacade = inject(TaskFacade);
    TaskStatusEnum: { [key: string]: string } = TaskStatus;

    statuses: Task['status'][] = [
        { value: 'todo', viewValue: this.TaskStatusEnum['todo'] },
        { value: 'inProgress', viewValue: this.TaskStatusEnum['inProgress'] },
        { value: 'done', viewValue: this.TaskStatusEnum['done'] },
    ];
    taskStatus = new FormControl(this.statuses[0]);

    constructor() {}

    ngOnInit(): void {
        if (this.task.status) this.taskStatus.setValue(this.task.status);
    }

    updateTaskStatus(): void {
        if (this.taskStatus.value) {
            const task = {
                id: this.task.id,
                title: this.task.title,
                sectionId: this.task.sectionId,
                status: this.taskStatus.value,
            };
            this.taskFacade.updateTask(task);
        }
    }

    toggleEditing(event?: MouseEvent): void {
        this.isEditing = !this.isEditing;
        event?.stopPropagation();
    }
}
