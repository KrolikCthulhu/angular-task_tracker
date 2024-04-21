import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '@entities/section/model/section.model';
import { Store, select } from '@ngrx/store';
import { selectAllSections } from '@entities/section/model/section.selectors';
import { loadSections } from '@entities/section/model/section.actions';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../../widgets/section-card/section-card.component';
import { AddSectionComponent } from '../../features/section/add-section/add-section.component';
import { AppState } from 'app/store';

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks-page.component.html',
    styleUrl: './tasks-page.component.scss',
    imports: [CommonModule, SectionCardComponent, AddSectionComponent],
})
export class TasksComponent {
    private store = inject(Store<AppState>);
    sections$: Observable<Section[]> = this.store.pipe(
        select(selectAllSections)
    );

    constructor() {
        this.store.dispatch(loadSections());
    }

    ngOnInit(): void {
        this.store.dispatch(loadSections());
    }
}
