import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/store';
import { Section } from './section.model';
import {
    addSection,
    deleteSection,
    loadSections,
    updateSectionTitle,
} from './section.actions';
import { Observable } from 'rxjs';
import {
    selectAllSections,
    selectLoading,
    selectSectionsFilteredByTaskStatus,
    selectTasksSortedByDate,
} from './section.selectors';
import { Task } from '@entities/task/model/task.model';

@Injectable({
    providedIn: 'root',
})
export class SectionFacade {
    private readonly store = inject(Store<AppState>);

    sections$: Observable<Section[]> = this.store.pipe(
        select(selectAllSections)
    );

    sectionsTasksSortedByDate$: Observable<Section[]> = this.store.pipe(
        select(selectTasksSortedByDate())
    );

    loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

    getSectionsFilteredByTaskStatus(
        status: Task['status']
    ): Observable<Section[]> {
        return this.store.pipe(
            select(selectSectionsFilteredByTaskStatus(status))
        );
    }

    addSection(section: Section): void {
        this.store.dispatch(addSection({ section }));
    }

    loadSections(): void {
        this.store.dispatch(loadSections());
    }

    updateSectionTitle(id: Section['id'], newTitle: Section['title']): void {
        this.store.dispatch(updateSectionTitle({ id, newTitle }));
    }

    deleteSection(id: Section['id']): void {
        this.store.dispatch(deleteSection({ id }));
    }
}
