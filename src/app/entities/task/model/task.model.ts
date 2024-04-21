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
