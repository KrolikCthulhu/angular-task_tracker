import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks-page/tasks-page.component';
import { TaskDetailPageComponent } from '@pages/task-detail-page/task-detail-page.component';

export const routes: Routes = [
    {
        path: '',
        component: TasksComponent,
    },
    {
        path: 'task/:id',
        component: TaskDetailPageComponent,
    },
];
