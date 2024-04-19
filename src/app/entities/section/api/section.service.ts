import { Injectable } from '@angular/core';
import { Section } from '../model/section.model';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private readonly STORAGE_KEY = 'sections';

  constructor() {}

  addSection(section: Section): Observable<Section> {
    let sections: Section[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '[]'
    );
    sections.push(section);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sections));
    return of(section);
  }

  getSections(): Observable<Section[]> {
    const sections: Section[] = JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '[]'
    );
    return of(sections).pipe(delay(1000));
  }
}
