import {
    ChangeDetectionStrategy,
    Component,
    Input,
    inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Section } from '@entities/section/model/section.model';
import { TaskFacade } from '@entities/task/model/task.facade';
import { Task } from '@entities/task/model/task.model';

@Component({
    selector: 'app-add-task',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
    @Input() sectionId!: Section['id'];
    private readonly taskFacade = inject(TaskFacade);

    addTask(): void {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: '',
            sectionId: this.sectionId,
        };
        this.taskFacade.addTask(newTask);
    }
}
