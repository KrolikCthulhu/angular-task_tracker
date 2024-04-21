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

    getSections(): Section[] {
        const sectionsJson = localStorage.getItem(this.STORAGE_KEY);
        return sectionsJson ? JSON.parse(sectionsJson) : [];
    }

    saveSections(sections: Section[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sections));
    }

    addTask(task: Task): Observable<Section[]> {
        const sections: Section[] = JSON.parse(
            localStorage.getItem(this.STORAGE_KEY) || '[]'
        );
        const updatedSections = sections.map((section) => {
            if (section.id === task.sectionId) {
                section.tasks.push(task);
            }
            return section;
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSections));
        return of(updatedSections);
    }

    // editTask(task: Task): Observable<Section[]> {
    //     const sections: Section[] = JSON.parse(
    //         localStorage.getItem(this.STORAGE_KEY) || '[]'
    //     );
    //     const sectionToUpdate = sections.find(
    //         (section) => section.id === task.sectionId
    //     );
    //     if (sectionToUpdate) {
    //         const taskToUpdate = sectionToUpdate.tasks.find(
    //             (task) => task.id === task.id
    //         );
    //         if (taskToUpdate) {
    //             Object.assign(taskToUpdate, editedParams);
    //             localStorage.setItem(
    //                 this.STORAGE_KEY,
    //                 JSON.stringify(sections)
    //             );
    //             return of(sections);
    //         }
    //     }
    //     return of();
    // }
    updateTask(task: Task): Observable<Section[]> {
        const sections = this.getSections();
        const sectionIndex = sections.findIndex(
            (section) => section.id === task.sectionId
        );
        if (sectionIndex !== -1) {
            const taskIndex = sections[sectionIndex].tasks.findIndex(
                (t) => t.id === task.id
            );
            if (taskIndex !== -1) {
                sections[sectionIndex].tasks[taskIndex] = task;
                this.saveSections(sections);
                return of(sections);
            }
        }
        return of();
    }
}
