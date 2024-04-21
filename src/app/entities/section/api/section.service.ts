import { Injectable } from '@angular/core';
import { Section } from '../model/section.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SectionService {
    private readonly STORAGE_KEY = 'sections';

    constructor() {}

    getSectionsFromLocalStorage = (): Section[] =>
        JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    addSection(section: Section): Observable<Section> {
        let sections: Section[] = this.getSectionsFromLocalStorage();
        sections.push(section);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sections));
        return of(section);
    }

    getSections(): Observable<Section[]> {
        const sections: Section[] = this.getSectionsFromLocalStorage();
        return of(sections).pipe(delay(1000));
    }

    updateSectionTitle(
        id: Section['id'],
        newTitle: Section['title']
    ): Observable<Section[]> {
        const sections: Section[] = this.getSectionsFromLocalStorage();
        const updatedSections: Section[] = sections.map((section) => {
            if (section.id === id) {
                return { ...section, title: newTitle };
            }
            return section;
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSections));
        return of(updatedSections);
    }

    deleteSection(id: Section['id']): Observable<Section[]> {
        const sections: Section[] = this.getSectionsFromLocalStorage();
        const updatedSections: Section[] = sections.filter(
            (section) => section.id !== id
        );
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSections));
        return of(updatedSections);
    }
}
