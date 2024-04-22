export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: Status;
    assignees?: string[];
    sectionId: string;
}

export interface Status {
    value: 'todo' | 'inProgress' | 'done';
    viewValue: string;
}

export enum TaskStatus {
    todo = 'сделать',
    inProgress = 'в процессе',
    done = 'завершено',
}
