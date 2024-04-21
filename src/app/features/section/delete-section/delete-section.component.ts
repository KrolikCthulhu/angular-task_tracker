import { Component, Input, inject } from '@angular/core';
import { deleteSection } from '@entities/section/model/section.actions';
import { Section } from '@entities/section/model/section.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-section',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './delete-section.component.html',
    styleUrl: './delete-section.component.scss',
})
export class DeleteSectionComponent {
    @Input() sectionId!: Section['id'];
    store = inject(Store<AppState>);

    onDeleteSection() {
        this.store.dispatch(deleteSection({ id: this.sectionId }));
    }
}
