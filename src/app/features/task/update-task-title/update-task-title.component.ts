import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Task } from '@entities/task/model/task.model';
import { MatInputModule } from '@angular/material/input';
import { TaskFacade } from '@entities/task/model/task.facade';

@Component({
    selector: 'app-update-task-title',
    standalone: true,
    imports: [MatCardModule, ReactiveFormsModule, MatInputModule],
    templateUrl: './update-task-title.component.html',
    styleUrl: './update-task-title.component.scss',
})
export class UpdateTaskTitleComponent {
    @Input() task!: Task;
    private readonly taskFacade = inject(TaskFacade);
    taskTitle: FormControl = new FormControl('');

    taskForm = new FormGroup({
        taskTitle: this.taskTitle,
    });

    saveTaskTitle(): void {
        const task = {
            id: this.task.id,
            sectionId: this.task.sectionId,
            title: this.taskForm.value.taskTitle,
        };
        this.taskFacade.updateTask(task);
    }
}
