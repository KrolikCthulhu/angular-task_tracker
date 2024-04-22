import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task.model';
import { Section } from '@entities/section/model/section.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly STORAGE_KEY = 'sections';

    constructor() {}

    getSectionsFromLocalStorage = (): Section[] =>
        JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    saveSections(sections: Section[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sections));
    }

    addTask(task: Task): Observable<Section[]> {
        const sections = this.getSectionsFromLocalStorage();
        const updatedSections = sections.map((section) => {
            if (section.id === task.sectionId) {
                section.tasks.push(task);
            }
            return section;
        });
        this.saveSections(updatedSections);
        return of(updatedSections);
    }

    updateTask(task: Task): Observable<Section[]> {
        const sections = this.getSectionsFromLocalStorage();
        const sectionIndex = sections.findIndex(
            (section) => section.id === task.sectionId
        );
        if (sectionIndex !== -1) {
            const taskIndex = sections[sectionIndex].tasks.findIndex(
                (t) => t.id === task.id
            );
            if (taskIndex !== -1) {
                sections[sectionIndex].tasks[taskIndex] = {
                    ...sections[sectionIndex].tasks[taskIndex],
                    ...task,
                };
                this.saveSections(sections);
                return of(sections);
            }
        }
        return of();
    }

    deleteTask(
        sectionId: Section['id'],
        taskId: Task['id']
    ): Observable<Section[]> {
        const sections = this.getSectionsFromLocalStorage();
        const sectionIndex = sections.findIndex(
            (section) => section.id === sectionId
        );
        if (sectionIndex !== -1) {
            const section = sections[sectionIndex];
            const updatedTasks = section.tasks.filter(
                (task) => task.id !== taskId
            );
            section.tasks = updatedTasks;
            this.saveSections(sections);
            return of(sections);
        }
        return of();
    }

    getTaskById(taskId: Task['id']): Observable<Task> {
        const sections = this.getSectionsFromLocalStorage();
        for (const section of sections) {
            const task = section.tasks.find((t) => t.id === taskId);
            if (task) {
                return of(task);
            }
        }
        return of();
    }
}
