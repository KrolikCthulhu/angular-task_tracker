export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'todo' | 'inProgress' | 'done';
    assignees?: string[];
    sectionId: string;
}

export enum TaskStatus {
    todo = 'сделать',
    inProgress = 'в процессе',
    done = 'завершено',
}

export enum TaskPriority {
    low = 'низкий',
    medium = 'средний',
    high = 'высокий',
}
