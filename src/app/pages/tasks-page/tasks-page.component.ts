import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '@entities/section/model/section.model';
import { Store, select } from '@ngrx/store';
import { selectAllSections } from '@entities/section/model/section.selectors';
import { loadSections } from '@entities/section/model/section.actions';
import { CommonModule } from '@angular/common';
import { SectionCardComponent } from '../../widgets/section-card/section-card.component';
import { AddSectionComponent } from '../../features/section/add-section/add-section.component';
import { AppState } from 'app/store';
import { SectionFacade } from '@entities/section/model/section.facade';

@Component({
    selector: 'app-tasks',
    standalone: true,
    templateUrl: './tasks-page.component.html',
    styleUrl: './tasks-page.component.scss',
    imports: [CommonModule, SectionCardComponent, AddSectionComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
    private readonly sectionFacade = inject(SectionFacade);
    sections$: Observable<Section[]> = this.sectionFacade.sections$;

    constructor() {
        this.sectionFacade.loadSections();
    }
}
