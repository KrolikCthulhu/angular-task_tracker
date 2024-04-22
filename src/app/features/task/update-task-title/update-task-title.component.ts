import {
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewChild,
    inject,
} from '@angular/core';
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
export class UpdateTaskTitleComponent implements OnInit {
    @Input() task!: Task;
    @ViewChild('sectionNameInput') sectionNameInput!: ElementRef;
    private readonly taskFacade = inject(TaskFacade);
    taskTitle: FormControl = new FormControl('');
    isEditing = false;

    taskForm = new FormGroup({
        taskTitle: this.taskTitle,
    });

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.taskForm.get('taskTitle')?.markAsTouched();
        setTimeout(() => {
            if (this.sectionNameInput) {
                this.renderer
                    .selectRootElement(this.sectionNameInput.nativeElement)
                    .focus();
            }
        });
    }

    saveTaskTitle(): void {
        if (this.taskForm.value.taskTitle) {
            const task = {
                id: this.task.id,
                sectionId: this.task.sectionId,
                title: this.taskForm.value.taskTitle,
            };
            this.taskFacade.updateTask(task);
        } else {
            this.taskFacade.deleteTask(this.task.sectionId, this.task.id);
        }
        this.isEditing = false;
    }

    editTaskTitle(event?: MouseEvent): void {
        event?.stopPropagation();
        this.isEditing = true;
        this.taskForm.patchValue({
            taskTitle: this.task.title,
        });
        setTimeout(() => {
            if (this.sectionNameInput) {
                this.renderer
                    .selectRootElement(this.sectionNameInput.nativeElement)
                    .focus();
            }
        });
    }
}
